import React from 'react';
import { useNavigate } from 'react-router-dom';

const Plan = ({ plan }) => {
    const navigate = useNavigate();

    return (
        <div className="p-2 sm:p-4 lg:w-1/2 w-full">
            <div className="flex border-2 rounded-lg bg-gray-100 border-opacity-50 p-8 flex-row cursor-pointer"
                onClick={() => { navigate(`/plan-view/${plan.id}`) }}>
                <div className="w-16 h-16 mr-8 mb-0 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 flex-shrink-0">
                    <img
                        src="/malker/malker.webp"
                        alt="Logo"
                        className="h-12 w-12 mx-2 mb-1"
                    />
                </div>
                <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-medium mb-3">{plan.name}</h2>
                    <p className="leading-relaxed text-base">
                        {plan.description.slice(0, 100) + "..."}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Plan;
