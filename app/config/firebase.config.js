const { initializeApp } = require("firebase/app");

const firebaseConfig = {
    apiKey: "AIzaSyA-VaKGfGZpBtQwHbP-PMp6g7_8JjqQGps",
    authDomain: "discordjs-ded7c.firebaseapp.com",
    projectId: "discordjs-ded7c",
    storageBucket: "discordjs-ded7c.appspot.com",
    messagingSenderId: "886267790580",
    appId: "1:886267790580:web:8283302169956f0814caa1"
};

const app = initializeApp(firebaseConfig);

module.exports = app;