/* eslint-disable no-shadow */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const DownloadCard = ({ image, downloadImage, removeImage }) => {
  const { id } = useParams();
  useEffect(() => {}, [id]);

  return (
    <div className="rounded-md overflow-hidden shadow-lg hover:shadow-2xl">
      <div className="w-full max-h-48 h-48 overflow-hidden">
        {image && (
          <img
            className="h-48 w-full object-cover transform transition duration-500 hover:scale-150"
            src={image}
            alt="view"
          />
        )}
      </div>
      <div className="flex">
        <div
          onClick={() => downloadImage(image)}
          className="w-full text-white py-2 cursor-pointer text-center bg-green-400 hover:bg-green-600">
          Download File
        </div>
        <div
          onClick={() => {
            // eslint-disable-next-line no-alert
            if (window.confirm('Do you want to delete this file?')) removeImage(image);
          }}
          className="w-full text-white py-2 cursor-pointer text-center bg-red-400 hover:bg-red-600">
          Delete File
        </div>
      </div>
    </div>
  );
};

export default DownloadCard;
