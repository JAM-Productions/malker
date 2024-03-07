import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserData, getUserPlans } from "../../comutils";
import Loader from "../loader/loader";
import BackButton from "../navigation/BackButton";


const MyPlans = () => {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [plans, setPlans] = useState([]);
    const [uuid, setUuid] = useState("");

    useEffect(() => {
        // Recover the username if the user already has one
        getUserData()
            .then((r) => {
                setUuid(r.data.uuid);
            })
            .catch((e) => {
                setLoading(false);
                toast.error("You are not logged");
                console.log(e.toString());
            });
    }, []);

    useEffect(() => {
        if (uuid !== "") {
            getUserPlans(uuid)
                .then((r) => {
                    setPlans(r.data);
                    setLoading(false);
                    console.log(r.data);
                })
                .catch((e) => {
                    setLoading(false);
                    toast.error("You are not logged");
                    console.log(e.toString());
                });
        }
    }, [uuid]);

    return (
        <div>
            <BackButton />
            <div className="p-20">
                <h1>My Plans</h1>
                {loading && (
                    <Loader height={47} width={47} barColor={"#0789c2"} borderColor={"#3dc2f3"} />
                )}
                {!loading && (<ul>
                    {plans.map((plan) => (
                    <li key={plan.id}>{plan.name}</li>
                    ))}
                </ul>
                )}
            </div>
        </div>
    );
};

export default MyPlans;
