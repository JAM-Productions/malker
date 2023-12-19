import React from "react";

const UserButton = ({ text, onClick }) => {
    return (
        <button className="
        flex 
        mx-auto 
        text-red-500    
        bg-transparent  
        border-2        
        border-red-500  
        px-8 
        focus:outline-none 
        hover:bg-red-300
        rounded 
        text-lg
            "
            onClick={onClick}
        >
            {text}
        </button>
    );
};

export default UserButton;