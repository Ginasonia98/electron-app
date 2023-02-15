/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Upload from 'src/assets/upload.png';

const UploadDownloadCard = ({ handleChange, image, previewImage, handleUploadImage }) => {
  const { id } = useParams();
  useEffect(() => {}, [id]);

  return (
    <div className="px-10 flex justify-center items-center my-6">
      <div className="border-solid border-2 border-indigo-600 p-4 rounded-lg shadow-md">
        <div className="px-6 py-4">
          <div className="text-center font-bold text-xl">Upload File Image</div>
          <div className="text-blue-600 text-lg mt-10">
            <label htmlFor="file_input" className="flex w-full justify-center">
              <img className="h-16" src={Upload} alt="upload-file" />
            </label>
            <input
              className="hidden block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              aria-describedby="file_input_help"
              id="file_input"
              onChange={handleChange}
              onClick={(event) => {
                event.target.value = null;
              }}
              type="file"
            />
            <p className="mt-2 mb-4 text-sm text-gray-500 text-center" id="file_input_help">
              SVG, PNG, JPG or GIF.
            </p>
            {image?.name && (
              <div className="w-full">
                <div className="flex justify-center w-full">
                  <div className="h-48 w-48 overflow-hidden flex items-center rounded-lg">
                    <img src={previewImage} alt="" />
                  </div>
                </div>
                <p className="mt-2 mb-4 text-sm text-gray-500 text-center" id="file_input_help">
                  {image.name}
                </p>
              </div>
            )}
            <div className="flex justify-end">
              <button
                type="button"
                disabled={!image?.name}
                onClick={handleUploadImage}
                className="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded disabled:bg-gray-500 disabled:text-white">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadDownloadCard;
