import React from "react";
import logo from "../../assets/images/logoBlue.png";
import styles from "./Footer.module.css"

const Footer = () => {
  return (

        <div className={styles.footer}> 
          <div className="d-flex flex-column mx-auto pb-3" style={{width: "80%"}}> {/* Use Flexbox for this footer */}
            <div className="d-flex flex-wrap justify-content-between">
              <div className="align-self-center">
                <a href="/#" className="d-flex align-items-center text-dark"> {/* Image is a link */}
                  <img
                    alt="logo"
                    src={logo}
                    width="250px"
                    style={{
                      position: "relative",
                      top: "-40px",
                      left: "-25px",
                      marginBottom: "-100px",
                    }}
                  />
                </a>   {/*End of image */}
                <div className=""> {/* Div have Icons*/}
                  <button
                    className="btn btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem", backgroundColor: "#aacaef", color: "white"}}>
                    <i className="fa fa-facebook"></i>
                  </button>
                  <button
                    className="btn btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem", backgroundColor: "#aacaef", color: "white"}}>
                    <i className="fa fa-twitter"></i>
                  </button>
                  <button
                    className="btn btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem", backgroundColor: "#aacaef", color: "white"}}>
                    <i className="fa fa-instagram"></i>
                  </button>
                </div>
                {/* End of icons*/}
              </div>
              <div>
                <p className="h5 mb-2" style={{fontWeight: "600", marginTop: "2rem"}}> {/* Text and Link*/}
                  Productify
                </p>
                <ul className="p-0" style={{listStyle: "none", cursor: "pointer",}}>
                  <li className="my-2">
                    <a className={`text-muted ${styles.link_edit}`} href="/home">
                      Home
                    </a>
                  </li>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/aboutus">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="h5 mb-2" style={{fontWeight: "600", marginTop: "2rem"}}>
                  Features
                </p>
                <ul className="p-0" style={{listStyle: "none", cursor: "pointer"}}>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/">
                      Calendar
                    </a>
                  </li>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/">
                      Top Users
                    </a>
                  </li>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/">
                      Study With Me
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p className="h5 mb-2" style={{fontWeight: "600", marginTop: "2rem"}}>
                  Help
                </p>
                <ul className="p-0" style={{listStyle: "none", cursor: "pointer"}}>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/">
                      Support
                    </a>
                  </li>
                  <li className="my-2 li-edit" >
                    <a className={`text-muted ${styles.link_edit}`} href="/auth">
                      Sign Up
                    </a>
                  </li>
                  <li className="my-2 li-edit">
                    <a className={`text-muted ${styles.link_edit}`} href="/auth">
                      Sign In
                    </a>
                  </li>
                </ul>
              </div>
              {/* End of text links*/}
            </div>
          </div>
        </div>

  );
};

export default Footer;


