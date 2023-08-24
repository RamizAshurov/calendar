import { useState } from 'react'
import './App.css';
import Calendar from './Calendar';
import Popup from './Popup';

function App() {
  const [date, setDate] = useState(new Date())
  const [picketDayId, setPickedDayId] = useState(null)
  const [popupOpen, setPopupOpen] = useState(false)
  const [reserveList, setReserve] = useState([])

  const changeMonth = (dir) => setDate(new Date(date.getFullYear(), date.getMonth() + dir, 1))

  const closePopup = () => setPopupOpen(false)

  const openPopup = (dayId) => {
    setPopupOpen(true)
    setPickedDayId(dayId)
  }

  const reserveDay = (dayId, name, phone) => {
    setReserve([...reserveList, { dayId, name, phone }])
  }

  return (
    <div className="App">
      <Calendar 
        date={date} 
        changeMonth={changeMonth}
        openPopup={openPopup}
        reserveList={reserveList}
      />
      { popupOpen && <Popup open={popupOpen} closePopup={closePopup} picketDay={picketDayId} reserveDay={reserveDay}/> }
    </div>
  );
}

export default App;
