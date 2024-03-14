import React, { useEffect, useState } from "react";
import { MdClose, MdContentCopy } from "react-icons/md";
import { getAuthToken, getUserByToken, setAuthToken } from "../../comutils";
import { toast } from "react-toastify";

const TokenDialog = ({ onClose }) => {
    const [token, setToken] = useState("");
    const [newToken, setNewToken] = useState("");

    useEffect(() => {
        getAuthToken().then((token) => {
            setToken(token);
        });
    }, []);

    const handleCopyToken = () => {
        navigator.clipboard.writeText(token);
        toast.success("Token copied to clipboard");
    };

    const handleImportToken = () => {
        getUserByToken(newToken)
            .then((r) => {
                if (r.data.uuid) {
                    setAuthToken(newToken);
                    window.location.reload();
                }
            })
            .catch((e) => {
                toast.error("Invalid token");
                console.log(e.toString());
            });
    };

    return (
        <div
            className="
            fixed
            left-0
            top-0
            z-50
            flex
            h-full
            w-full
            items-center
            justify-center
            bg-black
            bg-opacity-50
        "
        >
            <div className="w-full max-w-md rounded-lg bg-malker-100 p-4">
                <div className="flex justify-end">
                    <MdClose
                        className="
                        cursor-pointer
                        text-gray-500
                        hover:text-gray-700
                    "
                        size={24}
                        onClick={onClose}
                    />
                </div>
                <p>Your token is: </p>
                <div className="my-2 flex items-center">
                    <span
                        className="
                        max-w-[90%]
                        overflow-hidden
                        truncate
                        font-extrabold
                    "
                    >
                        {token}
                    </span>
                    <MdContentCopy
                        className="
                            ml-2
                            cursor-pointer
                            text-gray-500
                            hover:text-gray-700
                        "
                        size={20}
                        onClick={handleCopyToken}
                    />
                </div>
                <p>
                    Do you want to import a token from another device? (You will lose your current
                    data)
                </p>
                <input
                    type="text"
                    placeholder="Enter token"
                    onChange={(e) => {
                        setNewToken(e.target.value);
                    }}
                    className="
                        mt-2
                        w-full
                        rounded
                        border
                        border-gray-300
                        bg-malker-50
                        p-2
                        focus:outline-none
                    "
                />
                <button
                    className="
                    mt-4
                    w-full
                    rounded
                    bg-blue-500
                    p-2
                    text-white
                    "
                    onClick={handleImportToken}
                >
                    Import
                </button>
            </div>
        </div>
    );
};

export default TokenDialog;
