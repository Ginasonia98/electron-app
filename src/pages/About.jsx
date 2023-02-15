import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate('/');
  };
  return (
    <div>
      <div className="flex items-center p-10">
        <h1 className="text-2xl">Take me to Home Page</h1>
        <button
          type="button"
          onClick={goToHome}
          className="bg-blue-500 px-4 text-white ml-4 rounded-full">
          Home
        </button>
      </div>
    </div>
  );
};
export default About;
