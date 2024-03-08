const Button = ({ text, onClick, additionalStyles, small }) => {
    const buttonStyles = `
        flex
        mx-auto
        text-white
        bg-blue-500
        border-0
        ${small ? "py-1" : "py-2"}
        ${small ? "px-4" : "px-8"}
        focus:outline-none
        hover:bg-blue-600
        rounded
        ${small ? "text-sm" : "text-lg"}
        ${additionalStyles}
    `;
    return (
        <button className={buttonStyles} onClick={onClick}>
            {text}
        </button>
    );
};

export default Button;
