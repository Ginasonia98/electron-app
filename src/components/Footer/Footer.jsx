/* eslint-disable react/no-array-index-key */
import React from 'react';

const Footer = () => {
  const menus = ['Contact', 'About', 'Term & Condition'];
  return (
    <footer className="relative left-0 right-0 py-4 pl-3 bg-fuchsia-500 shadow-lg shadow-indigo-500/50 md:flex md:items-center md:justify-between dark:bg-gray-800 ring-purple-600 bottom-0 w-full h-24">
      <div className="text-sm text-white sm:text-center">
        © 2023
        <span className="text-white">PsalmCompany™</span>. All Rights Reserved.
      </div>
      <ul className="flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
        {menus.map((menu, index) => {
          return (
            <li key={`menu-${index}`}>
              <div className=" mr-4 md:mr-3  text-white ">{menu}</div>
            </li>
          );
        })}
      </ul>
    </footer>
  );
};

export default Footer;
