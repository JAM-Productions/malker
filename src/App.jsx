import { useEffect } from "react";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

import PlanView from "./components/plan/PlanView";
import PlanForm from "./components/plan/PlanForm";

import { getAuthToken } from "./comutils";

function App() {
    useEffect(() => {
        getAuthToken().then((token) => {
            console.log(token);
            //toast.success('account created')
        });
    }, []);

    return (
        <HashRouter>
            <div className='bg-malker-100 min-h-screen'>
                <Header />
                <div className='pt-5 min-h-[88vh]'>
                    <ToastContainer toastStyle={{ backgroundColor: "#edf8fd" }} />
                    <Routes>
                        <Route exact path='/' element={<PlanForm />} />
                        <Route path='/plan-view/:id' element={<PlanView />} />
                    </Routes>
                </div>
                <Footer />
            </div>
        </HashRouter>
    );
}

export default App;
