import React, { useEffect, useState } from "react";

const Input = ({ label, type, value, onChange, error, maxLength }) => {
    const [currentCharacters, setCurrentCharacters] = useState(value.length);
    const isDateInput = type === "date";

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurrentCharacters(value.length);
        onChange(value);
    };

    useEffect(() => {
        setCurrentCharacters(value.length);
    }, [value]);

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
            <input
                type={type}
                id={label}
                title={label}
                className={`
                    w-full
                    rounded
                    border
                    border-gray-300
                    bg-gray-100
                    bg-opacity-50
                    px-3
                    py-1
                    pb-3
                    text-base
                    leading-8
                    text-gray-700
                    outline-none
                    transition-colors
                    duration-200
                    ease-in-out
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-200
                    ${isDateInput ? "date-input-style" : ""}
                `}
                onChange={handleInputChange}
                error={error}
                value={value}
                maxLength={maxLength}
            />
            {currentCharacters > 0 && maxLength && (
                <div className="absolute bottom-1 right-2 text-xs text-gray-500">
                    {currentCharacters} / {maxLength}
                </div>
            )}
            {isDateInput && (
                <style jsx="true">{`
                    .date-input-style {
                        display: block;
                        -webkit-appearance: none;
                        -moz-appearance: textfield;
                        min-height: 3em;
                    }
                `}</style>
            )}
        </div>
    );
};

export default Input;
