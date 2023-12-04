import React, { useState, useEffect } from "react";
import Input from "./form/Input";
import Button from "./form/Button";
import { toast } from "react-toastify";
import BigInput from "./form/BigInput";

const PlanForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const savedState = localStorage.getItem("planFormState");
        console.log(savedState);
        if (savedState) {
            const parsedState = JSON.parse(savedState);
            setTitle(parsedState.title);
            setAuthor(parsedState.author);
            setDate(parsedState.date);
            setLocation(parsedState.location);
            setDescription(parsedState.description);
        }
    }, []);

    useEffect(() => {
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
        if (!title || !author || !description) {
            setError("Please fill out all fields");
            toast.error("Please fill out all fields");
            return;
        }

        // Perform the post plan logic here
        // ...

        // Reset the form
        resetForm();
        toast.success("Plan created successfully");
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
                                onChange={(e) => setTitle(e.target.value)}
                                error={error}
                                maxLength={30}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"author"}
                                type={"text"}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                error={error && !author}
                                maxLength={20}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"date"}
                                type={"date"}
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                error={error}
                            />
                        </div>
                        <div className="p-2 w-1/2">
                            <Input
                                label={"location"}
                                type={"text"}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                error={error}
                                maxLength={30}
                            />
                        </div>

                        <div className="p-2 w-full">
                            <BigInput
                                label={"description"}
                                onChange={(e) => setDescription(e.target.value)}
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