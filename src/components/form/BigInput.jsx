import React, { useState } from "react";

const BigInput = ({ label, onChange, value, error, maxLength }) => {
    const [currentCharacters, setCurrentCharacters] = useState(0);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurrentCharacters(value.length);
        onChange(value);
    };

    return (
        <div className="relative">
            <label
                htmlFor={label}
                className="
                    text-sm 
                    leading-7 
                    text-gray-600
                "
            >
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <textarea
                id={label}
                title={label}
                className="
                    h-32 
                    w-full 
                    resize-none 
                    rounded border 
                    border-gray-300 
                    bg-gray-100 
                    bg-opacity-50 
                    px-3 
                    py-1 
                    text-base 
                    leading-6 
                    text-gray-700 
                    outline-none 
                    transition-colors 
                    duration-200 
                    ease-in-out 
                    focus:border-blue-500 
                    focus:bg-white 
                    focus:ring-2 
                    focus:ring-blue-200
                "
                value={value}
                onChange={handleInputChange}
                error={error}
                maxLength={maxLength}
            ></textarea>
            {currentCharacters > 0 && maxLength && (
                <div className="absolute bottom-3 right-2 text-xs text-gray-500">
                    {currentCharacters} / {maxLength}
                </div>
            )}
        </div>
    );
};

export default BigInput;
