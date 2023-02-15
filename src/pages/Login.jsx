/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import { logInWithEmailAndPassword } from 'src/hooks/firebase-config';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const handleGoToRegister = () => {
    navigate('/register');
  };

  const updateFields = (key, value) => {
    setUser((oldData) => {
      oldData[`${key}`] = value;
      return { ...oldData };
    });
  };

  const submit = useCallback(async () => {
    const response = await logInWithEmailAndPassword(user.email, user.password);
    if (response?.user?.uid) {
      navigate(`/home/${response?.user?.uid}`);
    }
  }, [user]);

  useEffect(() => {
    // console.log({ user });
  }, [user]);

  return (
    <div className="container px-4 mx-auto py-8 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase ">
          Sign In
        </h1>
        <div className="mt-6">
          {/* <input type="file" /> */}
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => updateFields('email', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => updateFields('password', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="flex items-center w-1/3">
            <input
              type="checkbox"
              name="remember"
              className="w-5 h-5 border border-gray-300 rounded-sm outline-none cursor-pointer"
            />
            <label className="ml-2 text-sm" htmlFor="email">
              Remember me
            </label>
          </div>
          {/* <a href="#" className=" mt-6 text-xs font-light text-center text-gray-700 hover:underline">
            Forget Password?
          </a> */}
          <div className="mt-6">
            <button
              onClick={submit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Login
            </button>
          </div>
        </div>
        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?
          <button type="button" onClick={handleGoToRegister}>
            Register
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
