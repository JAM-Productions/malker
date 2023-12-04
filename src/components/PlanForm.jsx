import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import { toast } from "react-toastify";

const PlanForm = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");

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
        setDescription("");
        setError("");
    }

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

                        <div className="p-2 w-full">
                            <div className="relative">
                                <label
                                    htmlFor="description"
                                    className="
                                        leading-7 
                                        text-sm 
                                        text-gray-600
                                    "
                                >
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    title="description"
                                    className="
                                        w-full 
                                        bg-gray-100 
                                        bg-opacity-50 
                                        rounded border 
                                        border-gray-300 
                                        focus:border-blue-500 
                                        focus:bg-white 
                                        focus:ring-2 
                                        focus:ring-blue-200 
                                        h-32 
                                        text-base 
                                        outline-none 
                                        text-gray-700 
                                        py-1 
                                        px-3 
                                        resize-none 
                                        leading-6 
                                        transition-colors 
                                        duration-200 
                                        ease-in-out
                                    "
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    error={error && !description}
                                ></textarea>
                            </div>
                        </div>

                        <div class="p-2 w-full">
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