import React from "react";

const Button = ({ text, onClick, additionalStyles }) => {
    const buttonStyles = `
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
        ${additionalStyles}
    `;
    return (
        <button className={buttonStyles} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;