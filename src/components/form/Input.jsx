import React, { useEffect, useState } from "react";

const Input = ({
    label,
    type,
    value,
    onChange,
    error,
    maxLength
}) => {
    const [currentCharacters, setCurrentCharacters] = useState(value.length);
    const isDateInput = type === 'date';

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCurrentCharacters(value.length);
        onChange(value);
    };

    useEffect(() => {
        setCurrentCharacters(value.length);
    } , [value]);

    return (
        <div className="relative">
            <label htmlFor={label}
                className="
                    leading-7
                    text-sm
                    text-gray-600
                ">
                {label.charAt(0).toUpperCase() + label.slice(1)}
            </label>
            <input
                type={type}
                id={label}
                title={label}
                className={`
                    w-full
                    bg-gray-100
                    bg-opacity-50
                    rounded
                    border
                    border-gray-300
                    focus:border-blue-500
                    focus:bg-white
                    focus:ring-2
                    focus:ring-blue-200
                    text-base
                    outline-none
                    text-gray-700
                    py-1
                    pb-3
                    px-3
                    leading-8
                    transition-colors
                    duration-200
                    ease-in-out
                    ${isDateInput ? 'date-input-style' : ''}
                `}
                onChange={handleInputChange}
                error={error}
                value={value}
                maxLength={maxLength}
            />
            {currentCharacters > 0 && maxLength && (
                <div className="absolute right-2 bottom-1 text-xs text-gray-500">
                    {currentCharacters} / {maxLength}
                </div>
            )}
            {isDateInput && (
                <style jsx>{`
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
