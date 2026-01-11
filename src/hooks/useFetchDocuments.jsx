import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const collectionRef = collection(db, docCollection);

    let q;

    if (search) {
      const searchLower = search.toLowerCase();

      q = query(
        collectionRef,
        where("tagsArray", "array-contains", searchLower),
        orderBy("createdAt", "desc")
      );
    }else if(uid){
      q = query(
        collectionRef,
        where("uid", "==", uid),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(collectionRef, orderBy("createdAt", "desc"));
    }

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        setDocuments(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docCollection, search]);

  return {
    documents,
    loading,
    error,
  };
};
