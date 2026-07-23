import { initializeApp } 
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getAuth,
createUserWithEmailAndPassword

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import {

getDatabase,
ref,
set

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



const firebaseConfig = {

apiKey: "AIzaSyC-3DzWj-EY8ycWAtibBDqNkzojalYRjbI",

authDomain: "bances-pirate-emporium.firebaseapp.com",

databaseURL:"https://bances-pirate-emporium-default-rtdb.firebaseio.com",

projectId:"bances-pirate-emporium",

storageBucket:"bances-pirate-emporium.firebasestorage.app",

messagingSenderId:"193085375114",

appId:"1:193085375114:web:4380e8157dc1d93d96a373"

};



const app = initializeApp(firebaseConfig);


const auth = getAuth(app);


const database = getDatabase(app);



document.getElementById("signupButton").onclick = () => {


const username =
document.getElementById("username").value;


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



createUserWithEmailAndPassword(
auth,
email,
password

)


.then((userCredential)=>{


const user = userCredential.user;



return set(

ref(database,"users/" + user.uid),

{

username: username,

email: email,

role:"user"

}

);



})


.then(()=>{


alert("Welcome aboard!");

window.location.href="index.html";


})


.catch((error)=>{


alert(error.message);


});


};
