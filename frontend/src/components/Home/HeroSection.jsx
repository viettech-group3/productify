import React from "react";
import styles from "./HeroSection.module.css"; // Import your CSS module for HeroSection
import myImage from '../../assets/images/hero.jpg';
import '../../styles/global.css'
import Login from "../../components/Authentication/Login";
import Signup from "../../components/Authentication/Signup";

const HeroSection = () => {
  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.gradientBackground}`}>
        <div>
          <div className={styles.content}>
            <h1 className={styles.title}>
              Conquer Your Goals 
              <br></br>& Unlock Rewards!
            </h1>
            <div>
              <p className={styles.description}>
                Power up productivity with Productify – a gamified calendar
                that rewards task completion, study chat rooms for
                collaboration, and recognition for top performers!
              </p>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={() => { window.location.href = "/auth"; }}>Log In</button>
              <button className={styles.button} onClick={() => { window.location.href = "/auth"; }}>Sign Up</button>
            </div>
          </div>
          <div className={styles.imageContainer}>
            {/* Featured Content or Image */}
            <img 
              src={myImage}
              alt="Calendar Demo Image"
              className={`${styles.image}`}
            />
          </div>
        </div>
        
      </div>
    </div>
    
  );
};

export default HeroSection;
