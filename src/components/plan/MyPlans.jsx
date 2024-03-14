import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUserData, getUserPlans } from "../../comutils";
import Loader from "../loader/Loader";
import BackButton from "../navigation/BackButton";
import Plan from "../plans/Plan";

const MyPlans = () => {
    const [loading, setLoading] = useState(true);
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
                <div className="mb-10 flex w-full flex-col text-center">
                    <h1 className="title-font text-2xl font-medium text-gray-900 sm:text-3xl">
                        My Plans
                    </h1>
                </div>
                {loading && (
                    <Loader
                        height={47}
                        width={47}
                        barColor={"#0789c2"}
                        borderColor={"#3dc2f3"}
                    />
                )}
                {!loading && (
                    <section className="body-font text-gray-600">
                        <div className="container mx-auto  flex flex-wrap sm:px-5">
                            <div className="-m-4 -mx-10 flex flex-wrap">
                                {plans.map((plan) => (
                                    <Plan
                                        key={plan.id}
                                        plan={plan}
                                    />
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
