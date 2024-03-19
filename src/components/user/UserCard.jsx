import React, { useEffect } from "react";
import Button from "../Button.jsx";
import { deleteParticipant } from "../../comutils";
import { toast } from "react-toastify";

const UserCard = ({
    user,
    userUuid,
    currentUserUuid,
    planId,
    adminId,
    participants,
    setParticipants,
}) => {
    const leavePlan = () => {
        if (userUuid === currentUserUuid || currentUserUuid === adminId) {
            deleteParticipant(planId, userUuid).then((r) => {
                toast.success("Participant deleted");
                // Ejemplo: Eliminar la fila con id igual a 2
                setParticipants(
                    participants.filter(function (e) {
                        return e.uuid !== userUuid;
                    }),
                );
            });
        }
    };
    const showAdminTag = () => {
        if (userUuid === adminId) return "(Admin)";
    };
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
                <p className="text-sm font-bold">{user === null ? "unknown name" : user}</p>
                {userUuid === currentUserUuid && <p className="text-sm">You {showAdminTag()}</p>}
                {userUuid !== currentUserUuid && <p className="text-sm">Member {showAdminTag()}</p>}
            </div>

            <div className="flex-grow" />

            {(userUuid === currentUserUuid || currentUserUuid === adminId) && (
                <div className="mr-3">
                    <Button
                        text={userUuid === currentUserUuid ? "Leave" : "Remove"}
                        additionalStyles="
                            bg-red-500
                            hover:bg-red-600
                        "
                        small
                        onClick={leavePlan}
                    />
                </div>
            )}
        </div>
    );
};

export default UserCard;
