import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBWPBaMGbOQhv2xsyXxpFfePmnNtSKZ35s",
  authDomain: "xyronvault.firebaseapp.com",
  projectId: "xyronvault",
  storageBucket: "xyronvault.firebasestorage.app",
  messagingSenderId: "329297705997",
  appId: "1:329297705997:web:02627e466c4d8bc4262944",
  measurementId: "G-2H85HDHZZH"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* PRODUCTS */

window.addFirebaseItem = async function(item) {
  const product = {
    name: item.name,
    game: item.game,
    category: item.category,
    price: Number(item.price),
    stock: Number(item.stock),
    image: item.image || "",
    createdAt: Date.now()
  };

  const docRef = await addDoc(collection(db, "products"), product);

  return {
    id: docRef.id,
    ...product
  };
};

window.getFirebaseItems = async function() {
  const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

window.deleteFirebaseItem = async function(id) {
  await deleteDoc(doc(db, "products", id));
};

window.updateFirebaseItem = async function(id, data) {
  await updateDoc(doc(db, "products", id), data);
};

/* ORDERS */

window.addFirebaseOrder = async function(order) {
  const newOrder = {
    ...order,
    status: order.status || "Pending",
    createdAt: Date.now()
  };

  const docRef = await addDoc(collection(db, "orders"), newOrder);

  return {
    id: docRef.id,
    ...newOrder
  };
};

window.getFirebaseOrders = async function() {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  return snapshot.docs.map(docSnap => ({
    id: docSnap.id,
    ...docSnap.data()
  }));
};

window.updateFirebaseOrder = async function(id, data) {
  await updateDoc(doc(db, "orders", id), data);
};

window.deleteFirebaseOrder = async function(id) {
  await deleteDoc(doc(db, "orders", id));
};