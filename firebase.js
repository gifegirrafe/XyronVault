window.firebaseReady = false;
window.firebaseError = null;

function firebaseTimeout(promise, message) {
  return Promise.race([
    promise,
    new Promise(function(_, reject) {
      setTimeout(function() {
        reject(new Error(message));
      }, 12000);
    })
  ]);
}

(async function() {
  try {
    const appModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js");
    const firestoreModule = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js");

    const initializeApp = appModule.initializeApp;

    const getFirestore = firestoreModule.getFirestore;
    const collection = firestoreModule.collection;
    const addDoc = firestoreModule.addDoc;
    const getDocs = firestoreModule.getDocs;
    const deleteDoc = firestoreModule.deleteDoc;
    const doc = firestoreModule.doc;
    const updateDoc = firestoreModule.updateDoc;

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

    console.log("Firebase connected ✅");

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

      const docRef = await firebaseTimeout(
        addDoc(collection(db, "products"), product),
        "Product save took too long. Check Firestore rules or internet."
      );

      return {
        id: docRef.id,
        ...product
      };
    };

    window.getFirebaseItems = async function() {
      const snapshot = await firebaseTimeout(
        getDocs(collection(db, "products")),
        "Products loading took too long. Check Firestore rules or internet."
      );

      const items = snapshot.docs.map(function(docSnap) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      });

      return items.sort(function(a, b) {
        return Number(b.createdAt || 0) - Number(a.createdAt || 0);
      });
    };

    window.deleteFirebaseItem = async function(id) {
      await firebaseTimeout(
        deleteDoc(doc(db, "products", id)),
        "Delete product took too long."
      );
    };

    window.addFirebaseOrder = async function(order) {
      const newOrder = {
        ...order,
        status: order.status || "Pending",
        createdAt: Date.now()
      };

      const docRef = await firebaseTimeout(
        addDoc(collection(db, "orders"), newOrder),
        "Order save took too long. Check Firestore rules or internet."
      );

      return {
        id: docRef.id,
        ...newOrder
      };
    };

    window.getFirebaseOrders = async function() {
      const snapshot = await firebaseTimeout(
        getDocs(collection(db, "orders")),
        "Orders loading took too long. Check Firestore rules or internet."
      );

      const orders = snapshot.docs.map(function(docSnap) {
        return {
          id: docSnap.id,
          ...docSnap.data()
        };
      });

      return orders.sort(function(a, b) {
        return Number(b.createdAt || 0) - Number(a.createdAt || 0);
      });
    };

    window.updateFirebaseOrder = async function(id, data) {
      await firebaseTimeout(
        updateDoc(doc(db, "orders", id), data),
        "Order update took too long."
      );
    };

    window.deleteFirebaseOrder = async function(id) {
      await firebaseTimeout(
        deleteDoc(doc(db, "orders", id)),
        "Delete order took too long."
      );
    };

    window.firebaseReady = true;

  } catch (error) {
    console.error("Firebase setup error:", error);
    window.firebaseError = error;
    window.firebaseReady = false;
  }
})();
