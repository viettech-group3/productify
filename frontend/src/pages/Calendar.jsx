import { getMonth } from '../service/util';
import Month from '../components/Calendar/Month';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import SideBar from '../components/Calendar/SideBar';
import { React, useState, useEffect } from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import EventModal from '../components/Calendar/EventModal/EventModal';

function Calendar() {
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
  const [currentMonth, setCurrentMonth] = useState(getMonth(MonthIndex));
  useEffect(() => {
    //When MonthIndex is changed by redux dispatch => Then change currentMonth
    setCurrentMonth(getMonth(MonthIndex));
  }, [MonthIndex]);
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
          <div className="col-9">
            <Month month={monthTest} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calendar;
