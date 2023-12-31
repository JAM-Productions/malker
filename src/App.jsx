import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';
import Footer from './components/Footer';
import PlanView from './components/PlanView';
import PlanForm from './components/PlanForm';
import PlanShowParticipants from './components/PlanShowParticipants';
import { BASE_URL } from './config/constants';
import {getAuthToken, getUserData} from './comutils'
import {Form} from "react-router-dom";


function App() {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    fetch(BASE_URL + '/time')
      .then((res) => {
        console.log(res);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setCurrentTime(data.time);
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error fetching time');
      });
  }, []);

  useEffect(() => {
      getUserData().then(r => console.log(r.data)).catch(e => console.log(e))
  },[])

  return (
    <div className='
      bg-malker-100
      min-h-screen
    '>
      <Header />
      <div className='pt-20 min-h-[88vh]'>
        {/*<p>The current time is {currentTime}.</p>*/}
        <ToastContainer />
        <PlanShowParticipants />
      </div>
      <div className="rounded-full bg-blue-500 w-fit p-5" onClick={()=>getAuthToken('test-20')}>Get auth toke</div>
      <Footer />
    </div>
  )
}

export default App
