import React from "react";
import { useNavigate } from "react-router-dom";

const Plan = ({ plan }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full p-2 sm:p-4 lg:w-1/2">
            <div
                className="flex cursor-pointer flex-row rounded-lg border-2 border-opacity-50 bg-gray-100 p-8"
                onClick={() => {
                    navigate(`/plan/${plan.id}`);
                }}
            >
                <div className="mb-0 mr-8 inline-flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-500">
                    <img
                        src="/malker/malker.webp"
                        alt="Logo"
                        className="mx-2 mb-1 h-12 w-12"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="title-font mb-3 text-lg font-medium text-gray-900">
                        {plan.name}
                    </h2>
                    <p className="text-base leading-relaxed">
                        {plan.description.slice(0, 100) + "..."}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Plan;
