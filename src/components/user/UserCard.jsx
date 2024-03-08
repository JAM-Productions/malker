import React from "react";
import Button from "../Button.jsx";

const UserCard = ({ user, userUuid, currentUserUuid }) => {
    return (
        <div
            className="flex flex-row items-center px-2 py-4 rounded-md bg-malker-200 w-80 shadow-sm"
            key={user}
        >
            <img src="/malker/malker.webp" alt="Logo" className="h-9 w-9 ml-1 mr-2" />
            <div className="flex flex-col justify-center mx-2">
                <p className="font-bold text-sm">{user}</p>
                {userUuid === currentUserUuid && <p className="text-sm">Host</p>}
                {userUuid != currentUserUuid && <p className="text-sm">User</p>}
            </div>

            <div className="flex-grow" />

            {userUuid === currentUserUuid && (
                <div className="mr-3">
                    <Button
                        text={"Leave"}
                        additionalStyles="
                            bg-red-500
                            hover:bg-red-600
                        "
                        small
                    />
                </div>
            )}
        </div>
    );
};

export default UserCard;
