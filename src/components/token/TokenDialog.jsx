import React, { useEffect, useState } from "react";
import { MdClose, MdContentCopy } from "react-icons/md";
import { getAuthToken, setAuthToken } from "../../comutils";
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
        setAuthToken(newToken);
        window.location.reload();
    };

    return (
        <div
            className='
            fixed
            top-0
            left-0
            w-full
            h-full
            flex
            items-center
            justify-center
            bg-black
            bg-opacity-50
            z-50
        '>
            <div className='bg-malker-100 p-4 rounded-lg w-full max-w-md'>
                <div className='flex justify-end'>
                    <MdClose
                        className='
                        text-gray-500
                        cursor-pointer
                        hover:text-gray-700
                    '
                        size={24}
                        onClick={onClose}
                    />
                </div>
                <p>Your token is: </p>
                <div className='flex items-center my-2'>
                    <span
                        className='
                        overflow-hidden
                        max-w-[90%]
                        truncate
                        font-extrabold
                    '>
                        {token}
                    </span>
                    <MdContentCopy
                        className='
                            ml-2
                            text-gray-500
                            cursor-pointer
                            hover:text-gray-700
                        '
                        size={20}
                        onClick={handleCopyToken}
                    />
                </div>
                <p>
                    Do you want to import a token from another device? (You will lose your current
                    data)
                </p>
                <input
                    type='text'
                    placeholder='Enter token'
                    onChange={(e) => {
                        setNewToken(e.target.value);
                    }}
                    className='
                        w-full
                        mt-2
                        p-2
                        border
                        border-gray-300
                        rounded
                        bg-malker-50
                        focus:outline-none
                    '
                />
                <button
                    className='
                    w-full
                    bg-blue-500
                    text-white
                    p-2
                    mt-4
                    rounded
                    '
                    onClick={handleImportToken}>
                    Import
                </button>
            </div>
        </div>
    );
};

export default TokenDialog;
