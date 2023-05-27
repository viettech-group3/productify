import React from "react";
import logo from "../../assets/images/logoBlue.png";

const Footer = () => {
  return (
    <>
      <div class="blockcode">
        <div class="page-footer shadow">
          <div class="d-flex flex-column mx-auto py-5" style={{width: "80%"}}>
            <div class="d-flex flex-wrap justify-content-between">
              <div class="align-self-center">
                <a href="/#" class="d-flex align-items-center text-dark">
                  <img
                    alt="logo"
                    src={logo}
                    width="250px"
                    style={{
                      position: "relative",
                      top: "-60px",
                      left: "-25px",
                      marginBottom: "-100px",
                    }}
                  />
                </a>
                <div class="">
                  <button
                    class="btn btn-primary btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem"}}>
                    <i class="fa fa-facebook"></i>
                  </button>
                  <button
                    class="btn btn-primary btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem"}}>
                    <i class="fa fa-twitter"></i>
                  </button>
                  <button
                    class="btn btn-primary btn-flat py-1"
                    style={{width: "2.5rem", marginRight: "1rem"}}>
                    <i class="fa fa-instagram"></i>
                  </button>
                </div>
              </div>
              <div>
                <p class="h5 mb-4" style={{fontWeight: "600"}}>
                  Productify
                </p>
                <ul class="p-0" style={{listStyle: "none", cursor: "pointer"}}>
                  <li class="my-2">
                    <a class="text-dark" href="/home">
                      Home
                    </a>
                  </li>
                  <li class="my-2">
                    <a class="text-dark" href="/aboutus">
                      About Us
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p class="h5 mb-4" style={{fontWeight: "600"}}>
                  Features
                </p>
                <ul class="p-0" style={{listStyle: "none", cursor: "pointer"}}>
                  <li class="my-2">
                    <a class="text-dark" href="/">
                      Calendar
                    </a>
                  </li>
                  <li class="my-2">
                    <a class="text-dark" href="/">
                      Top Users
                    </a>
                  </li>
                  <li class="my-2">
                    <a class="text-dark" href="/">
                      Study With Me
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <p class="h5 mb-4" style={{fontWeight: "600"}}>
                  Help
                </p>
                <ul class="p-0" style={{listStyle: "none", cursor: "pointer"}}>
                  <li class="my-2">
                    <a class="text-dark" href="/">
                      Support
                    </a>
                  </li>
                  <li class="my-2">
                    <a class="text-dark" href="/auth">
                      Sign Up
                    </a>
                  </li>
                  <li class="my-2">
                    <a class="text-dark" href="/auth">
                      Sign In
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
