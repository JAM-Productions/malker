import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Input from "../form/Input";
import Button from "../Button";
import { toast } from "react-toastify";
import BigInput from "../form/BigInput";
import {createPlan} from "../../comutils";

const PlanForm = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedState = localStorage.getItem("planFormState");
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setTitle(parsedState.title);
            setAuthor(parsedState.author);
            setDate(parsedState.date);
            setLocation(parsedState.location);
            setDescription(parsedState.description)
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        if (loading) return;
        const stateToSave = {
            title,
            author,
            date,
            location,
            description
        };
        localStorage.setItem("planFormState", JSON.stringify(stateToSave));
    }, [title, author, date, location, description]);

    const handlePostPlan = () => {
        if (!title || !author || !description || !date || !location) {
            setError("Please fill out all fields");
            toast.error("Please fill out all fields");
            return;
        }

        // Format the date
        const formattedDate = formatDate(date);

        // Call the post endpoint
        createPlan(title, description, formattedDate, location).then((r) => {
            resetForm();
            toast.success("Plan created successfully");
            navigate('/malker/plan-view');
        });
    };

    // Function to format the date
    const formatDate = (inputDate) => {
        const dateObject = new Date(inputDate);
        const day = String(dateObject.getDate()).padStart(2, '0');
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const year = dateObject.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const resetForm = () => {
        setTitle("");
        setAuthor("");
        setDate("");
        setLocation("");
        setDescription("");
        setError("");
    };

    const handleClear = () => {
        resetForm();
        toast.info("Form cleared");
    };

    return (
        <section className="
                text-gray-600
                body-font
                relative
        ">
            <div className="
                container
                px-5
                py-24
                mx-auto
            ">
                <div className="
                    flex
                    flex-col
                    text-center
                    w-full
                    mb-12
                ">
                    <h1 className="
                        sm:text-3xl
                        text-2xl
                        font-medium
                        title-font
                        mb-4
                        text-gray-900
                    ">
                        Create a new plan
                    </h1>
                    <p className="
                        lg:w-2/3
                        mx-auto
                        leading-relaxed
                        text-base
                    ">
                        Fill out the form below to create a new plan.
                    </p>
                </div>
                <div className="
                    lg:w-1/2
                    md:w-2/3
                    mx-auto
                ">
                    <div className="
                        flex
                        flex-wrap
                        -m-2
                    ">
                        <div className="p-2 w-1/2">
                            <Input
                                label={"title"}
                                type={"text"}
                                value={title}
                                onChange={setTitle}
                                error={error}
                                maxLength={30}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"author"}
                                type={"text"}
                                value={author}
                                onChange={setAuthor}
                                error={error && !author}
                                maxLength={20}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"date"}
                                type={"date"}
                                value={date}
                                onChange={setDate}
                                error={error}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"location"}
                                type={"text"}
                                value={location}
                                onChange={setLocation}
                                error={error}
                                maxLength={30}
                            />
                        </div>

                        <div className="p-2 w-full">
                            <BigInput
                                label={"description"}
                                onChange={setDescription}
                                value={description}
                                error={error && !description}
                                maxLength={250}
                            />
                        </div>

                        <div className="p-2 w-full flex flex-row items-center">
                            <Button text={"Clear"}
                                onClick={handleClear}
                            />
                            <Button text={"Create"}
                                onClick={handlePostPlan}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default PlanForm;
