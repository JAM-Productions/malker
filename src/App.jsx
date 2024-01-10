import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Header from './components/Header';
import Footer from './components/Footer';

import PlanView from './components/PlanView';
import PlanForm from './components/PlanForm';
import PlanShowParticipants from './components/PlanShowParticipants';


function App() {

  return (
    <div className='bg-malker-100 min-h-screen'>

      <Header />

      <div className='pt-20 min-h-[88vh]'>

        <ToastContainer />

        <Router>

          <Routes>
            <Route exact path="/malker" element={<PlanForm />} />
            <Route path="/malker/plan-view" element={<PlanView />} />
            <Route path="/malker/show-participants" element={<PlanShowParticipants />} />
          </Routes>

        </Router>

      </div>

      <Footer />

    </div>
  )
}

export default App
