import React from "react";
import Button from "../Button.jsx";

const UserCard = ({ user, userUuid, currentUserUuid }) => {
    return (
        <div
            className="flex w-80 flex-row items-center rounded-md bg-malker-200 px-2 py-4 shadow-sm"
            key={user}
        >
            <img
                src="/malker/malker.webp"
                alt="Logo"
                className="ml-1 mr-2 h-9 w-9"
            />
            <div className="mx-2 flex flex-col justify-center">
                <p className="text-sm font-bold">{user}</p>
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
