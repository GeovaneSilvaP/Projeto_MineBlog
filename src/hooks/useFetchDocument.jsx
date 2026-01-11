import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { doc, onSnapshot } from "firebase/firestore";

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    const docRef = doc(db, docCollection, id);

    const unsubscribe = onSnapshot(
      docRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          setDocument({
            id: docSnapshot.id,
            ...docSnapshot.data(),
          });
        } else {
          setDocument(null);
          setError("Documento não encontrado");
        }

        setLoading(false);
      },
      (error) => {
        setError(error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [docCollection, id]);

  return {
    document,
    loading,
    error,
  };
};
