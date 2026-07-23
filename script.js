import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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

const auth = getAuth(app);


// PAGE ELEMENTS

const nameBox = document.getElementById("name");
const messageBox = document.getElementById("message");
const postButton = document.getElementById("postButton");
const messagesBox = document.getElementById("messages");

let currentUser = null;


// CHECK LOGIN

onAuthStateChanged(auth, (user) => {

    currentUser = user;


    if (user) {

        console.log("Logged in as:", user.email);

        if(postButton){
            postButton.disabled = false;
        }

    } else {

        console.log("Not logged in");

        if(postButton){
            postButton.disabled = true;
        }

        alert("You must login before posting!");

    }

});


// POST MESSAGE

if(postButton){

postButton.addEventListener("click", () => {


    if(!currentUser){

        alert("Login first!");

        return;

    }


    const name = nameBox.value.trim();

    const message = messageBox.value.trim();


    if(name === "" || message === ""){

        alert("Enter your name and message!");

        return;

    }


    push(ref(database,"messages"), {

        name:name,

        message:message,

        email:currentUser.email,

        time:new Date().toLocaleString()

    });


    messageBox.value="";


});

}


// DISPLAY MESSAGES

const messagesRef = ref(database,"messages");


onValue(messagesRef,(snapshot)=>{


    if(!messagesBox) return;


    messagesBox.innerHTML="";


    snapshot.forEach((child)=>{


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
