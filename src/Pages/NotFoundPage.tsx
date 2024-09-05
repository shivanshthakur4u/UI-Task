import React from 'react';
import { useNavigate } from 'react-router-dom';
import notFoundImage from "../assets/Images/404-Image.jpg"
const NotFoundPage:React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 max-sm:px-6">
      <h1 className="text-6xl font-bold text-gray-800 font-poppins">404</h1>
      <p className="mt-4 text-lg text-gray-600 font-poppins">Oops! The page you're looking for doesn't exist.</p>

      <button
        onClick={() => navigate('/')}
        className="mt-6 px-6 py-2 text-white bg-[#44924C] rounded-lg shadow-md transition duration-300 font-inter"
      >
        Go Back Home
      </button>

      <img
        src={notFoundImage}
        alt="404 Not Found"
        className="mt-10 max-w-md w-full rounded-xl"
      />
    </div>
  );
};

export default NotFoundPage;
