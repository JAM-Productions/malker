import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const BackButton = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    return (
        <div
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
            <IoIosArrowBack
                onClick={goBack}
                className="cursor-pointer text-2xl"
            />
        </div>
    );
};

export default BackButton;
