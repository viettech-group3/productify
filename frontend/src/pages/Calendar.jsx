import { getMonth } from "../service/util";
import Month from "../components/Calendar/Month"
import CalendarHeader from "../components/Calendar/CalendarHeader"
import SideBar from "../components/Calendar/SideBar" 
import React from "react";
import Navbar from "../components/Header/Navbar";
import Footer from "../components/Footer/Footer";

function Calendar() {
  const monthTest = getMonth()
  return (
    <div className="container-fluid App" style={{height: "100vh", overflow: "auto", display: "flex", flexDirection: "column", fontFamily:"Montserrat"}}>
      <Navbar />
      <div style={{backgroundColor: "whitesmoke"}}>
      <div className="row" >
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
