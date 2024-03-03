import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../form/Input";
import Button from "../Button";
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";
import BackButton from "../navigation/BackButton";
import { addParticipant, getPlanData, getUserData } from "../../comutils";
import UserCard from "../user/UserCard";
import { ProgressBar } from "react-loader-spinner";

const PlanView = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("");
    const [uuid, setUuid] = useState("");
    const [participants, setParticipants] = useState();
    const [joined, setJoined] = useState(false);
    const { id } = useParams();
    const [loading, setLoading] = useState(true);

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

    useEffect(() => {
        setLoading(true);
        // Fetch plan data when the 'id' parameter changes
        getPlanData(id)
            .then((r) => {
                setTitle(r.data.name);
                setAuthor(r.data.author);
                setDate(r.data.date);
                setLocation(r.data.location);
                setDescription(r.data.description);
                setParticipants(r.data.participants);
                console.log(r.data.participants);
                setLoading(false);
            })
            .catch((e) => {
                setLoading(false);
                toast.error("Plan not found");
                console.log(e.toString());
                navigate("/malker/");
            });
    }, [id]);

    useEffect(() => {
        // Check if the current user is in the list of participants
        if (participants && uuid) {
            const currentUserExists = participants.some(
                (participant) => participant.uuid === uuid
            );
            setJoined(currentUserExists);
            // console.log(joined, uuid, participants, (!joined))
        }
    }, [participants, uuid]);

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

    return (
        <section>
            {loading && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ProgressBar
                        visible={true}
                        height="47"
                        width="47"
                        barColor="#0789c2"
                        borderColor="#3dc2f3"
                        ariaLabel="progress-bar-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            )}
            {/*<BackButton />*/}
            <DropdownPlan
                title={title}
                date={date}
                location={location}
                description={description}
                author={author}
            />

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

export default PlanView;
