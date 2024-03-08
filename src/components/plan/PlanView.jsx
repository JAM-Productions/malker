import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";
import BackButton from "../navigation/BackButton";
import { getPlanData, getUserData, addParticipant } from "../../comutils";
import Loader from "../loader/loader";
import Input from "../form/Input";
import Button from "../Button";
import UserCard from "../user/UserCard";

const PlanView = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [participants, setParticipants] = useState();

    const { id } = useParams();
    const [loading, setLoading] = useState(true);

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
            .then(() => {
                toast.success("Join successfull");
                setJoined(true);
                setLoading(false);
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

    useEffect(() => {
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

    return (
        <div>
            {loading && <Loader />}
            {!loading && (
                <section>
                    <BackButton />
                    <div>
                        <DropdownPlan
                            title={title}
                            date={date}
                            location={location}
                            description={description}
                            author={author}
                        />
                        <div>
                            {joined && (
                                <div className="container mx-auto mb-10">
                                    <div className="flex flex-wrap justify-stretch gap-4">
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
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

export default PlanView;
