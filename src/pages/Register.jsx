/* eslint-disable no-param-reassign */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useCallback, useState } from 'react';
import { registerWithEmailAndPassword, logInWithEmailAndPassword } from 'src/hooks/firebase-config';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: '',
    password: '',
    email: '',
    phone: '',
    fullName: '',
    address: '',
    role: '',
  });

  const updateFields = (key, value) => {
    setUser((oldData) => {
      oldData[`${key}`] = value;
      return { ...oldData };
    });
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const submit = useCallback(async () => {
    const response = await registerWithEmailAndPassword(user);
    if (response.uid) {
      const data = await logInWithEmailAndPassword(response.email, user.password);
      if (data?.user?.uid) {
        navigate('/login');
      }
    }
  }, [user]);

  return (
    <div className="container px-4 mx-auto py-8 relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-rose-600/40 ring ring-2 ring-purple-600 lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-purple-700 underline uppercase ">
          Sign Up
        </h1>
        <div className="mt-6">
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              type="text"
              onChange={(e) => updateFields('username', e.target.value)}
              placeholder="Username"
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-800">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => updateFields('fullName', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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
          {/* <div className="mb-2">
            <label htmlFor="floating_phone" className="block text-sm font-semibold text-gray-800">
              Phone No.
            </label>
            <input
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_phone"
              id="floating_phone"
              placeholder="Phone Number"
              onChange={(e) => updateFields('phone', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div> */}
          <div className="mb-2">
            <label htmlFor="phone" className="block text-sm font-semibold text-gray-800">
              Phone No.
            </label>
            <input
              type="number"
              name="phone"
              placeholder="+62"
              required
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="address" className="block text-sm font-semibold text-gray-800">
              Address
            </label>
            <input
              type="text"
              placeholder="Address"
              onChange={(e) => updateFields('address', e.target.value)}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-800">
              Select Role
            </label>
            <select
              onChange={(e) => updateFields('role', e.target.value)}
              id="role"
              name="role"
              multiple={false}
              className="bg-purple-500 border block w-full px-4 py-2 mt-2 text-purple-700
              bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300
              focus:outline-none focus:ring focus:ring-opacity-40">
              <option selected>Choose Role</option>
              <option value="Admin" className="text-purple-700 ">
                Admin
              </option>
              <option value="General" className="text-purple-700 ">
                General
              </option>
            </select>
          </div>
          <div className="mt-6">
            <button
              onClick={submit}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600">
              Register
            </button>
          </div>
        </div>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          Already have an account?
          <button
            type="button"
            className="font-medium text-purple-600 hover:underline"
            onClick={handleGoToLogin}>
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
