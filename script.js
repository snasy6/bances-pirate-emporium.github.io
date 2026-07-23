import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
    getDatabase,
    ref,
    push,
    onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// YOUR FIREBASE SETTINGS

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


// SEND MESSAGE

window.postMessage = function(){


    let name = document.getElementById("name").value;

    let message = document.getElementById("message").value;


    if(name === "" || message === "") {

        alert("Please enter your name and message!");

        return;

    }


    push(ref(database,"messages"), {

        name:name,

        message:message,

        time:new Date().toLocaleString()

    });


    document.getElementById("message").value="";


};



// DISPLAY MESSAGES

const messages = ref(database,"messages");


onValue(messages,(snapshot)=>{


    let box=document.getElementById("messages");


    box.innerHTML="";


    snapshot.forEach((child)=>{


        let data=child.val();


        box.innerHTML += `

        <div class="post">

        <b>🏴‍☠️ ${data.name}</b>

        <br>

        <small>${data.time}</small>

        <p>${data.message}</p>

        </div>

        `;


    });


});
