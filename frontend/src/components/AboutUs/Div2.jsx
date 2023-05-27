import { React } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen, faEnvelopeOpen, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import styles from "./Div2.module.css"

const Div2 = () => {
  return (
    <div className={`${styles.total} container-fluid`}>
      <div className="row">
        <div className="col-6">
          <h1 className={`${styles.title} py-5` }>WHO ARE WE</h1>
          <p style={{paddingBottom: "3rem"}}>
            "Productify" is an innovative task management application crafted by
            a dedicated team of four mentees from Viet Tech Mentorship. Our team
            comprises four passionate computer science students hailing from
            various regions of Vietnam, pursuing their studies at the United States
          </p>
          <div className={` ${styles.icon_sentence} d-flex align-items-center mt-  `}>
            <FontAwesomeIcon className="pe-3" icon={faAddressBook} style={{color: "#0a5ceb", fontSize: "2rem", paddingTop: "0.5", }}  />
            <span>Tech enthusiasts on a mission to revolutionize management.</span>
          </div>
          <div className={` ${styles.icon_sentence} d-flex align-items-center mt-4 `}>
            <FontAwesomeIcon className="pe-3" icon={faChessQueen} style={{color: "#1361e7", fontSize: "2rem", paddingTop: "0.5"}} />
            <span>Driven by passion and expertise, we simplify productivity.</span>
          </div>
          <div className={` ${styles.icon_sentence} d-flex align-items-center mt-4 `}>
            <FontAwesomeIcon className="pe-3" icon={faEnvelopeOpen} style={{color: "#1159d4", fontSize: "2rem", paddingTop: "0.5"}} />
            <span>Innovators creating intuitive solutions for efficient workflow.</span>
          </div>
        </div>
        <div className="col-6 pt-5">
          <img className={styles.image} style={{objectFit:"cover", width: "120%", height: "100%", objectPosition: "left"}} src="https://scontent.fsgn2-6.fna.fbcdn.net/v/t1.15752-9/350101806_785816833255761_533086508457761949_n.png?_nc_cat=110&ccb=1-7&_nc_sid=ae9488&_nc_ohc=6HTVBGGOHOIAX9Hpw0z&_nc_ht=scontent.fsgn2-6.fna&oh=03_AdRwLj8J2otSD6Qzc-UrzroO_35YAxgoNDYcTR3D3MMPFg&oe=64992558"></img>
        </div>
      </div>
    </div>
  );
};

export default Div2;
