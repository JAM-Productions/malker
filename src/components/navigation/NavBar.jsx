import React from "react";
import { useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";

const NavBar = ({ onClose }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        onClose();
        navigate(path);
    };

    return (
        <div className="fixed inset-y-0 left-0 z-20 w-64 bg-blue-500 shadow-lg">
            <IoIosClose
                className="absolute left-4 top-2 cursor-pointer text-4xl text-white"
                onClick={onClose}
            />
            <div className="flex h-full flex-col pt-12">
                <button
                    className="px-6 py-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
                    onClick={() => handleNavigation("/")}
                >
                    Form
                </button>
                <button
                    className="px-6 py-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
                    onClick={() => handleNavigation("/myplans")}
                >
                    My Plans
                </button>
            </div>
        </div>
    );
};

export default NavBar;
