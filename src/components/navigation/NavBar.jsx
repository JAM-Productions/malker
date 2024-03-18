import React from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <div className="fixed inset-y-0 left-0 z-20 w-64 bg-blue-500 shadow-lg">
            <div className="flex h-full flex-col pt-12">
                <button
                    className="px-6 py-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
                    onClick={() => navigate("/")}
                >
                    Form
                </button>
                <button
                    className="px-6 py-4 font-semibold text-white transition duration-300 hover:bg-blue-600"
                    onClick={() => navigate("/myplans")}
                >
                    My Plans
                </button>
            </div>
        </div>
    );
};

export default NavBar;
