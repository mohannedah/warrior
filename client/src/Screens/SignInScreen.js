import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import { useSelector, useDispatch } from "react-redux";
import image from "../back.jpg";
import { loginUserAction } from "../Actions/userActions";
import Navbar from "../Components/NavBar/Navbar";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavBarContainer = styled.nav``;

const LogoContainer = styled.img`
  height: 12rem;
  object-fit: contain;
  cursor: pointer;
`;

const SignInScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const { subscription, loggedIn } = userInfo;

  const onClick = (e) => {
    history.push("/");
  };

  useEffect(() => {
    if (loggedIn) {
      if (subscription.status === "active") {
        history.push("/movies");
      } else {
        history.push("/pricing");
      }
    }
  }, [subscription, history, loggedIn]);

  const onSignIn = (e) => {
    e.preventDefault();
    dispatch(loginUserAction(email, password));
    // if (user.subscription.status === "active") {
    //   history.push("/");
    // } else {
    //   history.push("/pricing");
    // }
  };
  return (
    <>
      <main>
        <section className='absolute w-full h-full'>
          <LogoContainer
            style={{ position: "absolute", top: "0", left: "2", zIndex: "2" }}
            src={Logo}
            onClick={onClick}
          />
          <div
            className='absolute top-0 w-full h-full bg-gray-900'
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className='container mx-auto px-4 h-full'>
            <div className='flex content-center items-center justify-center h-full'>
              <div className='w-full lg:w-4/12 px-4'>
                <div
                  style={{ backgroundColor: "rgba(0,0,0,.75)" }}
                  className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0'
                >
                  <div className='rounded-t mb-0 px-6 py-6'>
                    <div className='text-center mb-3'>
                      <h4
                        style={{ fontSize: "2rem" }}
                        className='text-white-600 text-xl font-bold'
                      >
                        Sign In
                      </h4>
                    </div>

                    <hr className='mt-6 border-b-1 border-gray-400' />
                  </div>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <form>
                      <div className='relative w-full mb-6'>
                        <input
                          type='email'
                          className='px-3 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
                          placeholder='Email'
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{
                            fontSize: "1.5rem",
                            transition: "all .15s ease",
                          }}
                        />
                      </div>

                      <div className='relative w-full mb-7'>
                        <input
                          type='password'
                          className='px-3 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
                          placeholder='Password'
                          value={password}
                          onChange={(e) => setPass(e.target.value)}
                          style={{
                            fontSize: "1.5rem",
                            transition: "all .15s ease",
                          }}
                        />
                      </div>

                      <div className='text-center mt-6'>
                        <button
                          className='bg-red-600 text-white active:bg-gray-700 text-xl font-bold uppercase px-6 py-5 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full'
                          type='button'
                          style={{ transition: "all .15s ease" }}
                          onClick={onSignIn}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='flex flex-wrap mt-6'>
                  <div className='w-1/2'>
                    <a
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      className='text-gray-300'
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className='w-1/2 text-right'>
                    <a
                      href='#pablo'
                      onClick={(e) => e.preventDefault()}
                      className='text-gray-300'
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
export default SignInScreen;
