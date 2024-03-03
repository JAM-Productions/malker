import React from "react";
import { toast } from "react-toastify";
import Input from "../form/Input";
import { useState, useEffect } from "react";
import Button from "../Button";
import UserCard from "../user/UserCard";
import { addParticipant, getUserData } from "../../comutils";

const Participants = ({ id, participants, setLoading }) => {
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [uuid, setUuid] = useState("");
    const [joined, setJoined] = useState(false);

    useEffect(() => {
        // Recover the username if the user already has one
        getUserData()
            .then((r) => {
                setUuid(r.data.uuid);
                if (r.data.username !== null) {
                    setName(r.data.username);
                }
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                toast.error("You are not logged");
                console.log(e.toString());
            });
    }, []);

    const handleJoin = () => {
        if (!name) {
            setError("Please fill out all fields");
            toast.error("Please fill out all fields");
            return;
        }
        setLoading(true);

        // Call post endpoint
        addParticipant(id, uuid)
            .then((r) => {
                setLoading(false);
                toast.success("Join successfull");
                setJoined(true);
            })
            .catch((e) => {
                setLoading(false);
                toast.error("Can't join into the plan");
                console.log(e.toString());
            });
    };

    useEffect(() => {
        // Check if the current user is in the list of participants
        if (participants && uuid) {
            const currentUserExists = participants.some((participant) => participant.uuid === uuid);
            setJoined(currentUserExists);
            // console.log(joined, uuid, participants, (!joined))
        }
    }, [participants, uuid]);

    return (
        <section>
            {joined && (
                <div className="container mx-auto mb-10">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-10 w-10/12 mx-auto">
                        {participants.map((user) => (
                            <UserCard
                                user={user.username}
                                userUuid={user.uuid}
                                currentUserUuid={uuid}
                                key={user}
                            />
                        ))}
                    </div>
                </div>
            )}
            {!joined && (
                <div className="container mx-auto">
                    <div className="flex flex-col items-center justify-center">
                        <div className="p-2">
                            <Input
                                label={"Name"}
                                type={"text"}
                                value={name}
                                onChange={setName}
                                error={error}
                                maxLength={20}
                            />
                        </div>
                        <div className="p-2">
                            <Button text={"Join"} onClick={handleJoin} />
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Participants;
