import { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header';

function App() {
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    fetch('/api/time')
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

  return (
    <div className='
      bg-malker-100
      min-h-screen
    '>
      <Header />
      <div className='pt-20'>
        <p>The current time is {currentTime}.</p>
        <ToastContainer />
      </div>
    </div>
  )
}

export default App
