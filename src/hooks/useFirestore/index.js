/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { database, storage } from '../firebase-config';

const useFirestore = () => {
  const [percent, setPercent] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState({});
  const [blobFile, setBlobFile] = useState(null);
  const getFirestoreData = useCallback(async (service, key) => {
    const docRef = doc(database, service, key);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  }, []);

  const downloadFile = useCallback(async (url) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = async (event) => {
      const blob = await xhr.response;
      setBlobFile(blob);
      return blob;
    };
    xhr.open('GET', url);
    xhr.send();
  }, []);

  const deleteFile = useCallback(async (url, id) => {
    const imageRef = doc(database, 'images', id);
    return updateDoc(imageRef, {
      images: arrayRemove(url),
    }).then(async (response) => {
      return 'deleted';
    });
  }, []);

  const postFileFirebaseStorage = useCallback((file, id, type = 'images') => {
    const storageRef = ref(storage, `/${type}/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return uploadTask.on(
      'state_changed',
      (snapshot) => {
        const percents = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setPercent(percents);
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
          setUploadedUrl((oldData) => {
            oldData[`${type}`] = url;
            return { ...oldData };
          });
          const imageRef = doc(database, 'images', id);
          try {
            await updateDoc(imageRef, {
              images: arrayUnion(url),
            });
          } catch (err) {
            await setDoc(doc(database, type, id), {
              images: [url],
            });
          }
          setPercent(0);
          setUploadedUrl({});
          return url;
        });
      },
    );
  }, []);

  return {
    getFirestoreData,
    blobFile,
    setBlobFile,
    postFileFirebaseStorage,
    percent,
    uploadedUrl,
    downloadFile,
    deleteFile,
  };
};

export default useFirestore;
