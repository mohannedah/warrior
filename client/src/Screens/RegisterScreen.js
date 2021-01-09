import React, { useState, useEffect } from "react";
import NavBar from "../Components/NavBar";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { registerUserAction } from "../Actions/userActions";
import styles from "../assets/jss/material-kit-react/views/loginPage.js";

const useStyles = makeStyles(styles);

const RegisterScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [passwordConfirm, setPassConf] = useState("");
  const userInfo = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const { loggedIn } = userInfo;

  useEffect(() => {
    if (loggedIn) {
      history.push("/pricing");
    }
  }, [loggedIn, history]);

  console.log(email, password, passwordConfirm);
  const onRegister = () => {
    dispatch(registerUserAction(email, password, passwordConfirm));
  };
  return (
    <>
      <NavBar />
      <div
        className='absolute top-0 w-full h-full bg-gray-900'
        style={{
          backgroundColor: "#fff",
          zIndex: "-1",
        }}
      ></div>
      <div className='container mx-auto mt-10 px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4'>
            <div
              style={{ backgroundColor: "white" }}
              className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0'
            >
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h4
                    style={{ fontSize: "2rem", color: "#333" }}
                    className='text-white-600 text-xl font-bold'
                  >
                    Sign Up
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
                      style={{
                        fontSize: "1.5rem",
                        transition: "all .15s ease",
                      }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                  <div className='relative w-full mb-7'>
                    <input
                      type='password'
                      className='px-3 py-5 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full'
                      placeholder='Password Confirm'
                      value={passwordConfirm}
                      onChange={(e) => setPassConf(e.target.value)}
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
                      onClick={onRegister}
                    >
                      Sign Up
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterScreen;
