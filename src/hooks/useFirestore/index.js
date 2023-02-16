/* eslint-disable no-new */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
import { useCallback, useState } from 'react';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { database, storage } from '../firebase-config';

function readFile(file) {
  return new Promise((resolve, reject) => {
    // Create file reader
    const reader = new FileReader();

    // Register event listeners
    reader.addEventListener('loadend', (e) => resolve(e.target.result));
    reader.addEventListener('error', reject);

    // Read file
    reader.readAsArrayBuffer(file);
  });
}

async function getAsByteArray(file) {
  return new Uint8Array(await readFile(file));
}

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
    xhr.onload = async () => {
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
    }).then(async () => {
      return 'deleted';
    });
  }, []);

  const postFileFirebaseStorage = useCallback(async (file, id, type = 'images') => {
    const storageRef = ref(storage, `/${type}/${file.name}`);
    const byteFile = await getAsByteArray(file);
    const metadata = {
      contentType: file.type,
    };
    await uploadBytes(storageRef, byteFile, metadata).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (url) => {
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
    });
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
