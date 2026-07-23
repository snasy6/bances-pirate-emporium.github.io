import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


const firebaseConfig = {

    apiKey: "AIzaSyC-3DzWj-EY8ycWAtibBDqNkzojalYRjbI",

    authDomain: "bances-pirate-emporium.firebaseapp.com",

    databaseURL: "https://bances-pirate-emporium-default-rtdb.firebaseio.com",

    projectId: "bances-pirate-emporium",

    storageBucket: "bances-pirate-emporium.firebasestorage.app",

    messagingSenderId: "193085375114",

    appId: "1:193085375114:web:4380e8157dc1d93d96a373"

};


const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth(app);


const welcome = document.getElementById("welcome");
const messageBox = document.getElementById("message");
const postButton = document.getElementById("postButton");
const messagesBox = document.getElementById("messages");
const logoutButton = document.getElementById("logoutButton");


let currentUser = null;
let username = null;


// CHECK LOGIN

onAuthStateChanged(auth, async (user) => {

    if (user) {

        currentUser = user;


        const userSnap = await get(
            ref(database, "users/" + user.uid)
        );


        if (userSnap.exists()) {

            username = userSnap.val().username;

            welcome.innerHTML =
            "🏴‍☠️ Welcome " + username;

        } else {

            welcome.innerHTML =
            "Logged in, but profile missing";

        }


        postButton.disabled = false;


    } else {


        currentUser = null;

        username = null;


        welcome.innerHTML =
        "⚠️ Please login to post";


        postButton.disabled = true;


    }

});


// POST MESSAGE

postButton.addEventListener("click", () => {


    if (!currentUser) {

        alert("Login first!");

        return;

    }


    let message = messageBox.value.trim();


    if (message === "") {

        alert("Write a message!");

        return;

    }


    push(ref(database,"messages"), {

        username: username,

        message: message,

        time: new Date().toLocaleString()

    });


    messageBox.value = "";


});


// LOAD MESSAGES

onValue(ref(database,"messages"), (snapshot)=>{


    messagesBox.innerHTML = "";


    snapshot.forEach((child)=>{


        let data = child.val();


        messagesBox.innerHTML += `

        <div class="post">

        <b>🏴‍☠️ ${data.username}</b>

        <p>${data.message}</p>

        <small>${data.time}</small>

        </div>

        `;


    });


});


// LOGOUT

if(logoutButton){

logoutButton.onclick = ()=>{


    signOut(auth).then(()=>{


        window.location.href="login.html";


    });


};

}
