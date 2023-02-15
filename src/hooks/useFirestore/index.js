/* eslint-disable import/no-extraneous-dependencies */
import { useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { database } from '../firebase-config';

const useFirestore = () => {
  const getFirestoreData = useCallback(async (service, key) => {
    const docRef = doc(database, service, key);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  }, []);

  return { getFirestoreData };
};

export default useFirestore;
