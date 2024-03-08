import React from "react";
import Button from "../Button.jsx";

const UserCard = ({ user, userUuid, currentUserUuid }) => {
    return (
        <div className="flex flex-row items-center p-2 rounded-md bg-malker-200 w-fit" key={user}>
            <img src="/malker/malker.webp" alt="Logo" className="h-12 w-12 mx-3" />
            <div className="flex flex-col justify-center mx-2">
                <p className="font-bold text-ellipsis ...">MARKKMARKKMARKKMARKK</p>
                <p className="">Author</p>
            </div>

            {userUuid === currentUserUuid && (
                <div className="mx-3">
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
