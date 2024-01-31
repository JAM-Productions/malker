import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header';
import Footer from './components/Footer';

import PlanView from './components/plan/PlanView';
import PlanForm from './components/plan/PlanForm';
import PlanShowParticipants from './components/plan/PlanShowParticipants';

import {getAuthToken, getUserData, getPlanData} from './comutils'

function App() {

  useEffect(() => {
    getAuthToken().then((token) => {
      console.log(token)
      //toast.success('account created')
    })
  },[])

  return (
    <Router>
      <div className='bg-malker-100 min-h-screen'>
        <Header/>
        <div className='pt-5 min-h-[88vh]'>
          <ToastContainer />
            <Routes>
              <Route exact path="/malker" element={<PlanForm />} />
              <Route path="/malker/plan-view" element={<PlanView />} />
              <Route path="/malker/show-participants" element={<PlanShowParticipants />} />
            </Routes>
        </div>
        {/*<div className="rounded-full bg-blue-500 w-fit p-5" onClick={()=>getAuthToken('test-20')}>Get auth toke</div>*/}
        <Footer />
      </div>
    </Router>
  )
}

export default App
