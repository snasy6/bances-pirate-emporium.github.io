import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
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

const auth = getAuth(app);


// CREATE ACCOUNT

const signup = document.getElementById("signupButton");

if(signup){

signup.onclick = () => {

let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


createUserWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Welcome aboard!");

window.location.href="index.html";

})

.catch(error=>{

alert(error.message);

});

};

}


// LOGIN

const login = document.getElementById("loginButton");


if(login){

login.onclick = () => {


let email = document.getElementById("email").value;

let password = document.getElementById("password").value;


signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Welcome back!");

window.location.href="index.html";

})


.catch(error=>{

alert(error.message);

});


};

}
