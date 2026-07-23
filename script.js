import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// FIREBASE CONFIG

const firebaseConfig = {
    apiKey: "AIzaSyC-3DzWj-EY8ycWAtibBDqNkzojalYRjbI",
    authDomain: "bances-pirate-emporium.firebaseapp.com",
    databaseURL: "https://bances-pirate-emporium-default-rtdb.firebaseio.com",
    projectId: "bances-pirate-emporium",
    storageBucket: "bances-pirate-emporium.firebasestorage.app",
    messagingSenderId: "193085375114",
    appId: "1:193085375114:web:4380e8157dc1d93d96a373"
};


// START FIREBASE

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);


// GET HTML ELEMENTS

const nameBox = document.getElementById("name");
const messageBox = document.getElementById("message");
const messagesBox = document.getElementById("messages");
const postButton = document.getElementById("postButton");


// POST MESSAGE

function postMessage() {

    const name = nameBox.value.trim();
    const message = messageBox.value.trim();


    if (name === "" || message === "") {

        alert("Please enter your pirate name and message!");

        return;

    }


    push(ref(database, "messages"), {

        name: name,
        message: message,
        time: new Date().toLocaleString()

    });


    messageBox.value = "";

}


// BUTTON CLICK

postButton.addEventListener("click", postMessage);


// LOAD MESSAGES

const messagesRef = ref(database, "messages");


onValue(messagesRef, (snapshot) => {


    messagesBox.innerHTML = "";


    snapshot.forEach((child) => {


        const data = child.val();


        messagesBox.innerHTML += `

        <div class="post">

            <b>🏴‍☠️ ${data.name}</b>

            <br>

            <small>${data.time}</small>

            <p>${data.message}</p>

        </div>

        `;


    });


});
