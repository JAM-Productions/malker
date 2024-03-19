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
                    leading-7 
                    text-sm 
                    text-gray-600
                "
            >
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <textarea
                id={label}
                title={label}
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
                value={value}
                onChange={handleInputChange}
                error={error}
                maxLength={maxLength}
            ></textarea>
            {currentCharacters > 0 && maxLength && (
                <div className="absolute right-2 bottom-3 text-xs text-gray-500">
                    {currentCharacters} / {maxLength}
                </div>
            )}
        </div>
    );
};

export default BigInput;
