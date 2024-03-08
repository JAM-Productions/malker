import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserData, getUserPlans } from "../../comutils";
import Loader from "../loader/loader";
import BackButton from "../navigation/BackButton";
import Plan from "../plans/Plan";

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
                <div className="flex flex-col text-center w-full mb-10">
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">My Plans</h1>
            </div>
                {loading && (
                    <Loader height={47} width={47} barColor={"#0789c2"} borderColor={"#3dc2f3"} />
                )}
                {!loading && (
                    <section className="text-gray-600 body-font">
                        <div className="container px-5  mx-auto flex flex-wrap">
                            <div className="flex flex-wrap -m-4">
                                {plans.map((plan) => (
                                    <Plan key={plan.id} plan={plan} />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
};

export default MyPlans;
