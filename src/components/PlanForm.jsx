import React from "react";
import Input from "./Input";

const PlanForm = () => {
    return (
        <section class="
            text-gray-600 
            body-font 
            relative
        ">
            <div class="
                container 
                px-5 
                py-24 
                mx-auto
            ">
                <div class="
                    flex 
                    flex-col 
                    text-center 
                    w-full 
                    mb-12
                ">
                    <h1 class="
                        sm:text-3xl 
                        text-2xl 
                        font-medium 
                        title-font 
                        mb-4 
                        text-gray-900
                    ">
                        Create a new plan
                    </h1>
                    <p class="
                        lg:w-2/3 
                        mx-auto 
                        leading-relaxed 
                        text-base
                    ">
                        Fill out the form below to create a new plan.
                    </p>
                </div>
                <div class="
                    lg:w-1/2 
                    md:w-2/3 
                    mx-auto
                ">
                    <div class="
                        flex 
                        flex-wrap 
                        -m-2
                    ">
                        <div class="p-2 w-1/2">
                            <Input label={"title"} 
                                type={"text"}
                            />
                        </div>
                        <div class="p-2 w-1/2">
                            <Input label={"author"} 
                                type={"text"}
                            />
                        </div>
                        
                        <div class="p-2 w-full">
                            <div class="relative">
                                <label for="description" 
                                    class="
                                        leading-7 
                                        text-sm 
                                        text-gray-600
                                    ">
                                        Description
                                    </label>
                                <textarea id="description" 
                                    title="description" 
                                    class="
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
                                    ">
                                    </textarea>
                            </div>
                        </div>
                        <div class="p-2 w-full">
                            <button class="
                                flex 
                                mx-auto 
                                text-white 
                                bg-blue-500 
                                border-0 
                                py-2 
                                px-8 
                                focus:outline-none 
                                hover:bg-blue-600 
                                rounded 
                                text-lg
                            ">
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};  

export default PlanForm;