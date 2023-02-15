import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserByUid } from 'src/hooks/firebase-config';
import Footer from 'src/components/Footer/Footer';
import Card from 'src/components/Card/Card';

const Home = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [onlineUser, setOnlineUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);
  const getUserBuId = useCallback(async () => {
    if (id) {
      const userData = await getUserByUid(id);
      setOnlineUser(userData);
      setRoleUser(userData);
    }
  }, [id]);
  // const goToAbout = () => {
  //   navigate('/about');
  // };

  const goToRegister = () => {
    navigate('/');
  };

  useEffect(() => {
    getUserBuId();
  }, [id]);

  return (
    <div className="container">
      <div className=" bg-fuchsia-500  flex items-center  h-24">
        <nav className="border-gray-200 px-2 sm:px-4 py-2.5 rounded ">
          <div className="flex flex-wrap items-center justify-between mx-auto">
            <div className="flex items-center">
              <img
                src="https://png.pngtree.com/png-vector/20190925/ourmid/pngtree-lovely-yellow-star-clipart-png-vector-element-png-image_1739225.jpg"
                className="h-6 mr-3 sm:h-9"
                alt="Star Logo "
              />
              <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                Star
              </span>
            </div>
            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
              <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <div className="block text-white rounded  text-white mx-3" aria-current="page">
                    Home
                  </div>
                </li>
                <li>
                  <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                    About
                  </div>
                </li>
                <li>
                  <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                    Services
                  </div>
                </li>
                <li>
                  <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                    Contact
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div>
          {onlineUser?.fullName && (
            <>
              <div className="text-2xl text-white bg-pink-500 shadow-lg shadow-indigo-500/50 h-10 mx-28">
                {onlineUser?.fullName ?? 'none'}
              </div>
              {/* <button
            type="button"
            onClick={goToAbout}
            className="bg-blue-500 px-4 text-white ml-4 rounded-full">
            About
          </button> */}
            </>
          )}
          {!onlineUser?.fullName && (
            <button
              type="button"
              onClick={goToRegister}
              className="bg-blue-500 px-4 text-white ml-4 rounded-full">
              Register
            </button>
          )}
        </div>
        <div>
          {roleUser?.role && (
            <>
              <div className="text-2xl text-white bg-pink-500 shadow-lg shadow-indigo-500/50 h-10 ">
                {roleUser?.role ?? 'none'}
              </div>
              {/* <button
            type="button"
            onClick={goToAbout}
            className="bg-blue-500 px-4 text-white ml-4 rounded-full">
            About
          </button> */}
            </>
          )}
        </div>
      </div>
      <Card/>
      <Footer />
    </div>
  );
};
export default Home;
