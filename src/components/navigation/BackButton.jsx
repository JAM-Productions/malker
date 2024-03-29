import React from "react";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div
            id="back-button"
            className="
                lg:ml-18
                absolute
                top-0
                ml-4
                mt-20
                sm:ml-8
                md:ml-12
                xl:ml-24
                2xl:ml-32
            "
        >
            <IoMdArrowRoundBack
                onClick={goBack}
                className="
                    cursor-pointer
                    text-2xl
                    text-blue-500
                "
            />
        </div>
    );
};

export default BackButton;
