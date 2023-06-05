import { getMonth } from '../service/util';
import Month from '../components/Calendar/Month';
import CalendarHeader from '../components/Calendar/CalendarHeader';
import SideBar from '../components/Calendar/SideBar';
import React from 'react';
import Navbar from '../components/Header/Navbar';
import Footer from '../components/Footer/Footer';
import { useSelector, useDispatch } from 'react-redux'; //To manage Global State of Redux
import { toggle } from '../slices/ShowModalSlice'; //Import toggle function to turn on/off Modal
import EventModal from '../components/Calendar/EventModal/EventModal';

function Calendar() {
  const ShowModal = useSelector(state => state.ShowModal.value); //ShowModal is a boolean state that know as True - showing and False - not showing
  const dispatch = useDispatch(); //dispatch is touse function to interact with State of Redux
  const monthTest = getMonth();
  return (
    <div
      className="container-fluid App"
      style={{
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Montserrat',
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
            {ShowModal ? <EventModal /> : null}{' '}
            {/* If showModal is true => Displaying <EventModal/> */}
            <Month month={monthTest} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Calendar;
