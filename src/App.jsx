import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import PlanView from "./components/plan/PlanView";
import PlanForm from "./components/plan/PlanForm";

import { getAuthToken } from "./comutils";
import MyPlans from "./components/plan/MyPlans";

function App() {
    useEffect(() => {
        getAuthToken().then((token) => {
            console.log(token);
            //toast.success('account created')
        });
    }, []);

    return (
        <HashRouter>
            <div className="min-h-screen bg-malker-100">
                <Header />
                <div className="min-h-[88vh] pt-5">
                    <ToastContainer toastStyle={{ backgroundColor: "#edf8fd" }} />
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={<PlanForm />}
                        />
                        <Route
                            path="/plan/:id"
                            element={<PlanView />}
                        />
                        <Route
                            path="/myplans"
                            element={<MyPlans />}
                        />
                    </Routes>
                </div>
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
