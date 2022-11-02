import { useState, useEffect } from 'react';
import { db } from '~/LoginWith/config';
import { onSnapshot } from 'firebase/firestore';
import React from 'react';
const useFirestore = (collection, condition) => {
    const [documents, setDocuments] = useState([]);

    useEffect(() => {
        let collectionRef = db.collection(collection);

        if (condition) {
            if (!condition.compareValue || !condition.compareValue.length) {
                setDocuments([]);
                return;
            }

            collectionRef = collectionRef.where(condition.fieldName, condition.operator, condition.compareValue);
        }
        const unsubscribe = onSnapshot(collectionRef, (snapshot) => {
            const documents = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setDocuments(documents);
        });

        return unsubscribe;
    }, []);

    return documents;
};

export default useFirestore;
