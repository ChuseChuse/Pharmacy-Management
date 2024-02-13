// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCfgEgJXgFVCNvEtMrGwq1Cz4brF2CNC7g",
//   authDomain: "medicare-react-f4673.firebaseapp.com",
//   projectId: "medicare-react-f4673",
//   storageBucket: "medicare-react-f4673.appspot.com",
//   messagingSenderId: "655234591254",
//   appId: "1:655234591254:web:b7538f00826bbe3d6ce337",
//   measurementId: "G-89KF8GPSWY",
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth();

// export { app, auth, db };


// Hardcoded array of users
const users = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  // Add more users as needed
];

// Function to authenticate users
function authenticate(email, password) {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
      resolve(user);
    } else {
      reject(new Error("Invalid email or password"));
    }
  });
}

// Usage example
const emailInput = "user1@example.com";
const passwordInput = "password1";

authenticate(emailInput, passwordInput)
  .then(user => {
    console.log("Authentication successful:", user);
    // Proceed with authenticated user
  })
  .catch(error => {
    console.error("Authentication failed:", error.message);
    // Handle authentication failure
  });
