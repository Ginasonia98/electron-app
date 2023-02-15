/* eslint-disable react/prop-types */
import star from 'src/assets/star.png';

const HeaderSection = ({ onlineUser, roleUser }) => {
  return (
    <div className="sticky top-2 mt-2 px-2">
      <div className="bg-fuchsia-500 px-2 h-24 flex items-center rounded-md ">
        <div className="w-full container mx-auto px-10">
          <nav className="border-gray-200 py-2.5">
            <div className="flex flex-wrap items-center justify-between mx-auto">
              <div className="flex items-center">
                <img className="h-6 mr-3 sm:h-9" src={star} alt="star logo" />
                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">
                  Star
                </span>
              </div>
              <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                  <li className="flex flex-col justify-center">
                    <div className="block text-white rounded  text-white mx-3" aria-current="page">
                      Home
                    </div>
                  </li>
                  <li className="flex flex-col justify-center">
                    <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                      About
                    </div>
                  </li>
                  <li className="flex flex-col justify-center">
                    <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                      Services
                    </div>
                  </li>
                  <li className="flex flex-col justify-center">
                    <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                      Contact
                    </div>
                  </li>
                  <li>
                    {onlineUser?.fullName && (
                      <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white ">
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          {onlineUser?.fullName ?? 'none'}
                        </button>
                      </div>
                    )}
                  </li>
                  <li>
                    {roleUser?.role && (
                      <div className="block py-2 pl-3 pr-4 text-white rounded md:border-0  md:p-0  md:dark:hover:text-white  dark:hover:text-white  ">
                        <button
                          type="button"
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                          {roleUser?.role ?? 'none'}
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
