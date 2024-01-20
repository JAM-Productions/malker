import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import Input from '../form/Input';
import Button from '../Button';
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";

const PlanView = () => {
    const navigate = useNavigate()

    const title = "Excursion Montserrat"
    const author = "Jordi Bonet"
    const date = "Dia"
    const location = "Localizacion"
    const description = "Lorem ipsum dolor sit amet consectetur adipiscing elit, metus sem ridiculus aliquet primis natoque sociis netus, montes imperdiet placerat magnis orci quisque. Dui praesent fermentum orci id taciti, natoque placerat volutpat suscipit diam, tempus porta hac nulla. Inceptos nullam pellentesque volutpat egestas natoque consequat ultrices, cubilia a scelerisque felis parturient. Ac nisi volutpat quisque ultrices donec gravida sollicitudin felis tristique cras, id at ornare aliquet elementum ut conubia nec eget, condimentum penatibus commodo lobortis magnis maecenas a dignissim cum. Vulputate donec vitae ridiculus dictumst lectus posuere senectus, sagittis eu netus montes curabitur lacus euismod nibh, blandit semper a libero etiam vel. Lacinia himenaeos consequat nec aenean conubia aliquam odio fusce justo, egestas at rhoncus dui turpis potenti placerat integer magnis, sem vulputate etiam tincidunt pretium tellus luctus non. Lorem ipsum dolor sit amet consectetur adipiscing elit, metus sem ridiculus aliquet primis natoque sociis netus, montes imperdiet placerat magnis orci quisque. Dui praesent fermentum orci id taciti, natoque placerat volutpat suscipit diam, tempus porta hac nulla. Inceptos nullam pellentesque volutpat egestas natoque consequat ultrices, cubilia a scelerisque felis parturient. Ac nisi volutpat quisque ultrices donec gravida sollicitudin felis tristique cras, id at ornare aliquet elementum ut conubia nec eget, condimentum penatibus commodo lobortis magnis maecenas a dignissim cum. Vulputate donec vitae ridiculus dictumst lectus posuere senectus, sagittis eu netus montes curabitur lacus euismod nibh, blandit semper a libero etiam vel. Lacinia himenaeos consequat nec aenean conubia aliquam odio fusce justo, egestas at rhoncus dui turpis potenti placerat integer magnis, sem vulputate etiam tincidunt pretium tellus luctus non."

    const [name, setName] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {
        // get plan data
        // [TODO]
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
