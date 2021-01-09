import React from "react";
import backgroundImage from "../../../back.jpg";
import logo from "../../../images/logo.png";
import part1 from "../../../images/part1.png";
import part3 from "../../../images/part3.png";
import part2 from "../../../images/part2.jpg";
import { FeaturesContainer, Item1, Item2 } from "../index.js";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Hero = ({ history }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const { loggedIn } = userInfo;

  return (
    <>
      <div class='header-2'>
        <nav class='navbar navbar-transparent navbar-absolute'>
          <div class='container'>
            <div class='navbar-header d-flex align-items-center'>
              <img
                src={logo}
                style={{
                  height: "9rem",
                  marginTop: "-2rem",
                }}
                alt=''
              />
            </div>

            <div class='collapse navbar-collapse' id='navigation-example'>
              <ul class='nav navbar-nav navbar-right'>
                <Link
                  to='/signin'
                  style={{
                    backgroundColor: "red",
                    padding: "0.8rem 1.3rem",
                    color: "#Fff",
                    border: "none",
                    outline: "none",
                    borderRadius: "0.5rem",
                  }}
                >
                  Sign In
                </Link>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div>
        <div
          class='page-header header-filter'
          style={{
            backgroundImage: `url(${backgroundImage})`,
            borderBottom: "5px solid #757575",
          }}
        >
          <div class='container'>
            <div class='row'>
              <div class='col-md-8 col-md-offset-2 col-45 text-center'>
                <h1
                  class='title'
                  style={{
                    fontFamily: "Helvetica, sans-serif",
                    fontWeight: "700",
                  }}
                >
                  Unlimited movies, TV shows, and more.
                </h1>
                <h3
                  class='title-3'
                  style={{
                    fontFamily: "Helvetica, sans-serif",
                    fontWeight: "500",
                  }}
                >
                  Watch anywhere. Cancel anytime.
                </h3>
                <Link
                  to={loggedIn ? "/pricing" : "/signup"}
                  style={{
                    padding: "1rem 12rem",
                    fontSize: "2rem",
                    backgroundColor: "red",
                  }}
                  className='btn btn-primary'
                >
                  Get Started
                  <i
                    style={{ marginLeft: "2rem" }}
                    class='fas fa-chevron-right'
                  ></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FeaturesContainer>
        <Item1>
          <h2
            style={{
              fontSize: "5rem",
              fontWeight: "700",
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Enjoy on your TV.
          </h2>
          <h3
            style={{
              fontSize: "2.8rem",
              fontWeight: "500",
              fontFamily: "Helvetica, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Watch on Smart TVs, Playstation, Xbox, Chromecast, Apple TV, Blu-ray
            players, and more.
          </h3>
        </Item1>
        <Item2>
          <img style={{ height: "40rem" }} src={part1} />
        </Item2>
      </FeaturesContainer>
      <FeaturesContainer>
        <Item2>
          <img style={{ height: "40rem" }} src={part2} />
        </Item2>
        <Item1>
          <h2
            style={{
              fontSize: "5rem",
              fontWeight: "700",
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Download your shows to watch offline.{" "}
          </h2>
          <h3
            style={{
              fontSize: "2.8rem",
              fontWeight: "500",
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Save your favorites easily and always have something to watch.
          </h3>
        </Item1>
      </FeaturesContainer>
      <FeaturesContainer>
        <Item1>
          <h2
            style={{
              fontSize: "5rem",
              fontWeight: "700",
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Watch everywhere.
          </h2>
          <h3
            style={{
              fontSize: "2.8rem",
              fontWeight: "500",
              fontFamily: "Arial, sans-serif",
              color: "white",
              marginTop: "-2rem",
            }}
            class='title'
          >
            Stream unlimited movies and TV shows on your phone, tablet, laptop,
            and TV without paying more.
          </h3>
        </Item1>
        <Item2>
          <img style={{ height: "35rem" }} src={part3} />
        </Item2>
      </FeaturesContainer>
      <footer
        style={{
          fontFamily: "Arial,sans-serif",
          color: "#757575",
          borderTop: "1px solid #757575 ",
        }}
        class='footer footer-big'
      >
        <div class='container'>
          <div class='content'>
            <div class='row'>
              <div class='col-md-3'>
                <ul class='links-vertical'>
                  <li>
                    <a href='#pablo'>FAQ</a>
                  </li>
                  <li>
                    <a href='#pablo'>Invester Relations</a>
                  </li>
                  <li>
                    <a href='#pablo'>Privacy</a>
                  </li>
                  <li>
                    <a href='#pablo'>Speed Test</a>
                  </li>
                </ul>
              </div>
              <div class='col-md-3'>
                <ul class='links-vertical'>
                  <li>
                    <a href='#pablo'>Help Center</a>
                  </li>
                  <li>
                    <a href='#pablo'>Jobs</a>
                  </li>
                  <li>
                    <a href='#pablo'>Cookie Preference</a>
                  </li>
                  <li>
                    <a href='#pablo'>Legal Notices</a>
                  </li>
                </ul>
              </div>

              <div class='col-md-3'>
                <ul class='links-vertical'>
                  <li>
                    <a href='#pablo'>Account</a>
                  </li>
                  <li>
                    <a href='#pablo'>Ways to Watch</a>
                  </li>
                  <li>
                    <a href='#pablo'>Corporate information</a>
                  </li>
                  <li>
                    <a href='#pablo'>Netflix Originals</a>
                  </li>
                </ul>
              </div>

              <div class='col-md-3'>
                <ul class='links-vertical'>
                  <li>
                    <a href='#pablo'>Media Center</a>
                  </li>
                  <li>
                    <a href='#pablo'>Terms of Use</a>
                  </li>
                  <li>
                    <a href='#pablo'>Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Hero;
