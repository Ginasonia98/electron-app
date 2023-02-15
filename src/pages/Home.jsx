/* eslint-disable no-shadow */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUid } from 'src/hooks/firebase-config';
import Footer from 'src/components/Footer/Footer';
import Card from 'src/components/Card/Card';
import Card2 from 'src/components/Card/Card2';
import HeaderSection from 'src/components/Header';
import useFirestore from 'src/hooks/useFirestore';
// import axios from 'axios';

const fileType = ['image/svg', 'image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

const Home = () => {
  const { id } = useParams();
  const {
    postFileFirebaseStorage,
    uploadedUrl,
    getFirestoreData,
    downloadFile,
    blobFile,
    setBlobFile,
    deleteFile,
  } = useFirestore();
  const [fileUsers, setFileUsers] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState('');
  const [onlineUser, setOnlineUser] = useState(null);
  const [roleUser, setRoleUser] = useState(null);
  const getUserById = useCallback(async () => {
    if (id) {
      const userData = await getUserByUid(id);
      setOnlineUser(userData);
      setRoleUser(userData);
    }
  }, [id]);
  // const goToAbout = () => {
  //   navigate('/about');
  // };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    if (!fileType.includes(file.type)) {
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreviewImage(objectUrl);
    setImage(e.target.files[0]);
  };

  const handleUploadImage = useCallback(async () => {
    await postFileFirebaseStorage(image, id, 'images');
  }, [image, id]);

  const getImages = useCallback(async () => {
    const images = await getFirestoreData('images', id);
    setFileUsers(images.images);
  }, [id]);

  const removeImage = useCallback(
    async (url) => {
      const response = await deleteFile(url, id);
      if (response === 'deleted') {
        getImages();
      }
    },
    [id],
  );

  const downloadImage = useCallback(async (url) => {
    await downloadFile(url);
  }, []);

  const extractFile = useCallback(async (blobFile) => {
    const blobUrl = URL.createObjectURL(blobFile);
    // Create a link element
    const link = document.createElement('a');
    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = 'file';
    // Append link to the body
    document.body.appendChild(link);
    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      }),
    );
    // Remove link from body
    document.body.removeChild(link);
    setBlobFile(null);
  }, []);

  useEffect(() => {
    if (blobFile) {
      extractFile(blobFile);
    }
  }, [blobFile]);

  useEffect(() => {
    if (id) {
      getUserById();
      getImages();
    }
  }, [id]);

  useEffect(() => {
    if (uploadedUrl) {
      setImage(null);
      setPreviewImage('');
      getImages();
    }
  }, [uploadedUrl]);

  return (
    <div>
      <HeaderSection onlineUser={onlineUser} roleUser={roleUser} />
      <Card
        handleChange={handleChange}
        image={image}
        previewImage={previewImage}
        handleUploadImage={handleUploadImage}
      />
      <div className="container mx-auto px-10 my-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {fileUsers.map((item, index) => {
          return (
            <div key={`images-${index}`}>
              <Card2 image={item} downloadImage={downloadImage} removeImage={removeImage} />
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};
export default Home;