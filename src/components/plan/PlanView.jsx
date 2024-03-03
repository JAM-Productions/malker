import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import DropdownPlan from "../dropdown/DropdownPlan";
import BackButton from "../navigation/BackButton";
import { getPlanData } from "../../comutils";
import { ProgressBar } from "react-loader-spinner";
import Participants from "../participants/Participants";

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
        <section>
            <BackButton />
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
            {!loading && (
                <div>
                    <DropdownPlan
                        title={title}
                        date={date}
                        location={location}
                        description={description}
                        author={author}
                    />
                    <Participants id={id} participants={participants} setLoading={setLoading} />
                </div>
            )}
        </section>
    );
};

export default PlanView;
