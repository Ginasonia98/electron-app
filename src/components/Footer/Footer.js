import React from 'react';

const Footer = () => {
  return (
    <footer className="p-4 bg-fuchsia-500  shadow-lg shadow-indigo-500/50 md:flex md:items-center md:justify-between dark:bg-gray-800 ring-purple-600 fixed bottom-0 w-full h-48">
      <div className="text-sm text-white sm:text-center ">
        © 2023
        <span className="text-white">
           PsalmCompany™
        </span>
        . All Rights Reserved.
      </div>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <div className=" mr-4  text-white ">
            Contact
          </div>
        </li>
        <li>
          <div className="mr-4  md:mr-6 text-white ">
            About
          </div>
        </li>
        <li>
          <div className="mr-4  md:mr-6 text-white ">
            Term & Condition
          </div>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
