import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../form/Input";
import Button from "../Button";
import { toast } from "react-toastify";
import BigInput from "../form/BigInput";
import { createPlan, getUserData, updateUsername } from "../../comutils";
import LoadingView from "../loader/LoadingView";

const PlanForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const savedState = localStorage.getItem("planFormState");
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setTitle(parsedState.title);
            setAuthor(parsedState.author);
            setDate(parsedState.date);
            setLocation(parsedState.location);
            setDescription(parsedState.description);
        }
        getUserData()
            .then((r) => {
                if (r.data.username) {
                    setUsername(r.data.username);
                    setAuthor(r.data.username);
                }
            })
            .catch((e) => {
                console.log("could not fetch user data" + e);
            });
        setLoading(false);
    }, []);

    useEffect(() => {
        if (loading) return;
        const stateToSave = {
            title,
            author,
            date,
            location,
            description,
        };
        localStorage.setItem("planFormState", JSON.stringify(stateToSave));
    }, [title, author, date, location, description]);

    const handlePostPlan = () => {
        if (!title || !author || !description || !date || !location) {
            setError("Please fill out all fields");
            toast.error("Please fill out all fields");
            return;
        }

        // Replace description line breaks with "<br>"
        const formattedDescription = description.replace(/\n/g, "<br>");

        setLoading(true);

        // Format the date
        const formattedDate = formatDate(date);

        // Call the update username enpoint
        updateUsername(author)
            .then((r) => {
                // Call the post endpoint
                createPlan(title, formattedDescription, formattedDate, location)
                    .then((r) => {
                        //resetForm();
                        //setLoading(false);
                        toast.success("Plan created successfully");
                        navigate(`/plan/${r.data.id}`);
                    })
                    .catch((error) => {
                        setLoading(false);
                        console.error("Error creating plan:", error);
                        toast.error("Error creating plan. Please try again.");
                    });
            })
            .catch((error) => {
                setLoading(false);
                console.error("Error updating username (prior to plan creation):", error);
                toast.error("Error creating plan. Please try again.");
            });
    };

    // Function to format the date
    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const day = String(dateObject.getDate()).padStart(2, "0");
        const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const resetForm = () => {
        setTitle("");
        setDate("");
        setLocation("");
        setDescription("");
        setError("");
        setAuthor(username);
    };

    const handleClear = () => {
        resetForm();
        toast.info("Form cleared");
    };

    return (
        <LoadingView loading={loading}>
            <section className="body-font relative text-gray-600">
                <div className="container mx-auto px-5 py-24">
                    <div className="mb-12 flex w-full flex-col text-center">
                        <h1
                            id="header"
                            className="title-font  mb-4 text-2xl font-medium text-gray-900 sm:text-3xl "
                        >
                            Create a new plan
                        </h1>
                        <p
                            id="subheader"
                            className="lg:w-2/3mx-autoleading-relaxedtext-base"
                        >
                            Fill out the form below to create a new plan.
                        </p>
                    </div>
                    <div className="mx-auto md:w-2/3 lg:w-1/2 ">
                        <div className="-m-2 flex flex-wrap ">
                            <div className="w-1/2 p-2">
                                <Input
                                    label={"title"}
                                    type={"text"}
                                    value={title}
                                    onChange={setTitle}
                                    error={error}
                                    maxLength={30}
                                />
                            </div>
                            <div className="w-1/2 p-2">
                                <Input
                                    label={"author"}
                                    type={"text"}
                                    value={author}
                                    onChange={setAuthor}
                                    error={error && !author}
                                    maxLength={20}
                                />
                            </div>
                            <div className="w-1/2 p-2">
                                <Input
                                    label={"date"}
                                    type={"date"}
                                    value={date}
                                    onChange={setDate}
                                    error={error}
                                />
                            </div>
                            <div className="w-1/2 p-2">
                                <Input
                                    label={"location"}
                                    type={"text"}
                                    value={location}
                                    onChange={setLocation}
                                    error={error}
                                    maxLength={30}
                                />
                            </div>

                            <div className="w-full p-2">
                                <BigInput
                                    label={"description"}
                                    onChange={setDescription}
                                    value={description}
                                    error={error && !description}
                                    maxLength={250}
                                />
                            </div>

                            <div className="flex w-full flex-row items-center p-2">
                                <Button
                                    text={"Clear"}
                                    onClick={handleClear}
                                />
                                <Button
                                    text={"Create"}
                                    onClick={handlePostPlan}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </LoadingView>
    );
};

export default PlanForm;
