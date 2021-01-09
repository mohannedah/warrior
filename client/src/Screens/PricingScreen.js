import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../Components/NavBar";
import { useSelector } from "react-redux";
const Container = styled.body`
  background-color: #fff;
  height: 100vh;
`;

const PricingScreen = ({ history }) => {
  const userInfo = useSelector((state) => state.userInfo);
  const { loggedIn } = userInfo;

  useEffect(() => {
    if (!loggedIn) {
      history.push("/");
    }
  }, [loggedIn, history]);
  return (
    <>
      <Container class='bg-gradient-to-b from-white to-gray-50'>
        <Navbar />
        <div class='bg-gradient-to-b from-white to-gray-50'>
          <div class='max-w-10xl mx-auto pt-18 px-6 sm:px-8 lg:px-10'>
            <div class='sm:flex sm:flex-col sm:align-center'>
              <h1 class='text-10xl font-extrabold text-gray-900 sm:text-center'>
                Pricing Plans
              </h1>
              <p class='mt-5 text-3xl text-gray-500 sm:text-center'>
                Start watching for free. Account plans unlock additional
                features.
              </p>
            </div>
            <div class='mt-12 space-y-4 sm:mt-16 sm:space-y-0 lg:max-w-4xl p-8 flex flex-col md:flex-row justify-around items-stretch mx-auto xl:max-w-none xl:mx-0'>
              <div class='border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-200'>
                <div class='p-6'>
                  <h2 class='text-2xl leading-6 font-large text-gray-900'>
                    Basic
                  </h2>
                  <p class='mt-4 text-xl text-gray-500'>
                    Enjoy by watcing all movies
                  </p>
                  <p class='mt-8'>
                    <span class='text-6xl font-extrabold text-gray-900'>
                      $12
                    </span>
                    <span class='text-base text-3xl font-medium text-gray-500'>
                      /mo
                    </span>
                  </p>
                  <Link
                    to='/payment/basic'
                    class='mt-8 block color-white w-full bg-red-600 border border-transparent rounded-md py-4 text-2xl font-semibold text-white text-center hover:bg-red-700 hover:text-white'
                  >
                    Subscribe
                  </Link>
                </div>
                <div class='pt-6 pb-8 px-6'>
                  <h3 class='text-xl font-medium text-gray-900 tracking-wide uppercase'>
                    What's Included
                  </h3>
                  <ul class='mt-6 space-y-4'>
                    <li class='flex space-x-3'>
                      <svg
                        class='flex-shrink-0 h-5 w-5 text-green-500'
                        x-description='Heroicon name: check'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-xl text-gray-500'>
                        Potenti felis, in cras at at ligula nunc.
                      </span>
                    </li>

                    <li class='flex space-x-3'>
                      <svg
                        class='flex-shrink-0 h-5 w-5 text-green-500'
                        x-description='Heroicon name: check'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-xl text-gray-500'>
                        Orci neque eget pellentesque.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class='border border-gray-200 rounded-xl shadow-sm divide-y divide-gray-200'>
                <div class='p-4'>
                  <h2 class='text-2xl leading-6 font-large text-gray-900'>
                    Premium
                  </h2>
                  <p class='mt-4 text-xl text-gray-500'>
                    All the basics and additional features.
                  </p>
                  <p class='mt-8'>
                    <span class='text-6xl font-extrabold text-gray-900'>
                      $24
                    </span>
                    <span class='text-base text-3xl text-gray-500'>/mo</span>
                  </p>
                  <Link
                    to='/payment/premium'
                    class='mt-8 block w-full bg-red-600 border border-transparent rounded-md py-4 text-2xl font-semibold text-white text-center hover:bg-red-700 hover:text-white'
                  >
                    Subscribe
                  </Link>
                </div>
                <div class='pt-6 pb-8 px-6'>
                  <h3 class='text-xl font-medium text-gray-900 tracking-wide uppercase'>
                    What's included
                  </h3>
                  <ul class='mt-6 space-y-4'>
                    <li class='flex space-x-3'>
                      <svg
                        class='flex-shrink-0 h-5 w-5 text-green-500'
                        x-description='Heroicon name: check'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-xl text-gray-500'>
                        Potenti felis, in cras at at ligula nunc.{" "}
                      </span>
                    </li>

                    <li class='flex space-x-3'>
                      <svg
                        class='flex-shrink-0 h-5 w-5 text-green-500'
                        x-description='Heroicon name: check'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-xl text-gray-500'>
                        Orci neque eget pellentesque.
                      </span>
                    </li>

                    <li class='flex space-x-3'>
                      <svg
                        class='flex-shrink-0 h-5 w-5 text-green-500'
                        x-description='Heroicon name: check'
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      <span class='text-xl text-gray-500'>
                        Donec mauris sit in eu tincidunt etiam.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PricingScreen;
