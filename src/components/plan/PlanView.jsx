import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../form/Input';
import Button from '../Button';
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";
import BackButton from "../navigation/BackButton";
import {addParticipant, getPlanData, getUserData} from "../../comutils";
import UserCard from "../user/UserCard";

const PlanView = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const [uuid, setUuid] = useState("")
    const [participants, setParticipants] = useState();
    const [joined, setJoined] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        getPlanData(id).then((r) => {
            setTitle(r.data.name)
            setAuthor(r.data.author)
            setDate(r.data.date)
            setLocation(r.data.location)
            setDescription(r.data.description)
            setParticipants(r.data.participants)
            console.log(r.data.participants)
            console.log(participants)

        }).catch((e) => {
            toast.error('Plan not found')
            navigate('/malker/')
        })

        // recover the username if the user already has one
        getUserData().then((r) => {
            setUuid(r.data.uuid)

            // Check if the current user is in the list of participants
            const currentUserExists = participants.some(participant => participant.uuid === uuid);
            setJoined(currentUserExists);
            console.log(participants)
            console.log(currentUserExists)

            if (r.data.username !== null) {
                setName(r.data.username)
            }
        }).catch((e) => {
            toast.error('You are not logged')
        })

    }, []);

    const handleJoin = () => {
        if (!name) {
            setError("Please fill out all fields")
            toast.error("Please fill out all fields")
            return
        }

        // call post endpoint
        addParticipant(id, uuid).then((r) => {
            toast.success("Join successfull");
            setJoined(true)
        }).catch((e) => {
            toast.error("Can't join into the plan")
            console.log(e.toString())
        })
    }

    return (
        <section>
            <BackButton />
            <DropdownPlan title={title} date={date} location={location} description={description} author={author}/>

            {joined && (
                <div className="container mx-auto mb-10">
                    <div
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-10 w-10/12 mx-auto">
                        {participants.map((user) => (
                            <UserCard user={user.username} userUuid={user.uuid} currentUserUuid={uuid} key={user}/>
                        ))}
                    </div>
                </div>
            )}
            {(uuid !== '' || !joined) && (
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
                            <Button
                                text={"Join"}
                                onClick={handleJoin}
                            />
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

export default PlanView;
