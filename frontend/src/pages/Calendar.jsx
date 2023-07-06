import { getMonth } from '../service/util';
import Month from '../components/Calendar/Month';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import SideBar from '../components/Calendar/SideBar';
import { React, useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux';
import EventModal from '../components/Calendar/EventModal/EventModal';
import DayView from '../components/Calendar/DayView/DayView';
import { fetchTodayEvents } from '../slices/TodayEventsSlice';

function Calendar() {
  const ShowModal = useSelector(state => state.ShowModal.value);
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const [currentMonth, setCurrentMonth] = useState(getMonth(MonthIndex));
  const dispatch = useDispatch();
  const currentDate = new Date().getDate(); // Get the current date
  console.log('currentDate: ', currentDate);

  useEffect(() => {
    setCurrentMonth(getMonth(MonthIndex));
  }, [MonthIndex]);

  useEffect(() => {
    dispatch(fetchTodayEvents(currentDate)); // Fetch today's events
  }, [dispatch, currentDate]);

  return (
    <div
      className="container-fluid App"
      style={{
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Montserrat',
        padding: '0px',
      }}
    >
      <Navbar />
      <div style={{ backgroundColor: 'whitesmoke' }}>
        <div className="row">
          <CalendarHeader />
        </div>
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9" style={{ padding: '0' }}>
            {ShowModal ? <EventModal /> : <></>}
            <Month month={currentMonth} />
            <DayView currentDate={currentDate} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calendar;
