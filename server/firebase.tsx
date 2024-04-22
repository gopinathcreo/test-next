"use server"

// Import the functions you need from the SDKs you need
import * as admin from 'firebase-admin';


const cache = new Map();

if (!admin.apps.length) {
  const serviceAccount = require('./firebase-admin.json');

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

let db = admin.firestore();

export const getDocument = async (path: string) => {
    // server from cache first if not found then get from server and update cache
    
    const collectionRef = await db.doc(path).get();
    const data = collectionRef.data();
    return data;
};