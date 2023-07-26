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
import { switchViewMode } from '../slices/ViewModeSlice';
import { useNavigate } from 'react-router-dom';
import ShowPoints from '../components/Calendar/ShowPoints/ShowPoints';
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion'; //transition effect
function Calendar() {
  const slideInVariants = {
    //transition effect
    initial: { x: -500, opacity: 0.4 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };
  const transition = {
    duration: 1.4, // Adjust the duration to control how long the animation takes
    ease: 'easeInOut', // Use different easing functions for different effects
  };

  const smallComponentSlideInVariants = {
    initial: { y: 500, opacity: 0.2 },
    animate: { y: 0, opacity: 1 },
    exit: { x: -100, opacity: 0 },
  };

  const smallComponentsTransition = {
    duration: 1.2, // Adjust the duration to control how long the animation takes
    ease: 'easeInOut', // Use different easing functions for different effects
  };

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    console.log('user', user);
    if (user == null) {
      navigate('/auth');
    }
  }, []);
  const ShowModal = useSelector(state => state.ShowModal.value);
  const MonthIndex = useSelector(state => state.MonthIndex.value);
  const [currentMonth, setCurrentMonth] = useState(getMonth(MonthIndex));
  const dispatch = useDispatch();
  const currentDate = new Date().getDate(); // Get the current date
  const ViewMode = useSelector(state => state.ViewMode.value);
  useEffect(() => {
    setCurrentMonth(getMonth(MonthIndex));
  }, [MonthIndex]);

  useEffect(() => {
    dispatch(fetchTodayEvents(currentDate)); // Fetch today's events
  }, [dispatch, currentDate]);

  return user == null ? (
    <div>Loading....</div>
  ) : (
    <motion.div
      className="container-fluid App"
      style={{
        height: '100vh',
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Montserrat',
        padding: '0px',
      }}
      variants={slideInVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
    >
      <Navbar />
      <ShowPoints />
      <motion.div
        style={{ backgroundColor: 'whitesmoke' }}
        variants={smallComponentSlideInVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={smallComponentsTransition}
      >
        <div className="row">
          <CalendarHeader />
        </div>
        <div className="row">
          <div className="col-3">
            <SideBar />
          </div>
          <div className="col-9" style={{ padding: '0' }}>
            {ShowModal ? <EventModal /> : <></>}
            {ViewMode === 'month' ? (
              <Month month={currentMonth} />
            ) : (
              <DayView currentDate={currentDate} />
            )}
          </div>
        </div>
      </motion.div>
      <Footer />
      <Toaster />{' '}
      {/*Put <Toaster/> here is set up the toast inside EventUpdateForm will be shown in Calendar page - so toast won't be turned off if we turn off the update form */}
    </motion.div>
  );
}

export default Calendar;
