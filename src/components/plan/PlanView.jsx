import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Input from '../form/Input';
import Button from '../Button';
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";
import BackButton from "../navigation/BackButton";
import {getPlanData, getUserData} from "../../comutils";

const PlanView = () => {
    const navigate = useNavigate()

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("")
    const [error, setError] = useState("")
    const { id } = useParams();

    useEffect(() => {
        getPlanData(id).then((r) => {
            setTitle(r.data.name)
            setAuthor(r.data.author)
            setDate(r.data.date)
            setLocation(r.data.location)
            setDescription(r.data.description)
        })
        
        // recover the username if the user already has one
        getUserData().then((r) => {
            if (r.data.username !== null) {
                setName(r.data.username)
            }
        })
    }, []);

    const handleJoin = () => {
        if (!name) {
            setError("Please fill out all fields")
            toast.error("Please fill out all fields")
            return
        }

        // call post endpoint
        // [TODO]

        setName("")
        toast.success("Join successfull");

        navigate('/malker/show-participants')
    }

    return (
        <section>
            <BackButton />
            <DropdownPlan title={title} date={date} location={location} description={description} author={author}/>

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

        </section>
    )
}

export default PlanView;
