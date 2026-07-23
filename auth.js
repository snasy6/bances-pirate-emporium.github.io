import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
    getDatabase,
    ref,
    set
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

const auth = getAuth(app);

const database = getDatabase(app);



// =====================
// SIGN UP
// =====================

const signupButton = document.getElementById("signupButton");


if (signupButton) {


    signupButton.addEventListener("click", () => {


        const username =
        document.getElementById("username").value.trim();


        const email =
        document.getElementById("email").value.trim();


        const password =
        document.getElementById("password").value;



        if(username === "" || email === "" || password === ""){

            alert("Fill in all fields!");

            return;

        }



        createUserWithEmailAndPassword(
            auth,
            email,
            password
        )


        .then((result)=>{


            const user = result.user;



            return set(

                ref(database, "users/" + user.uid),

                {

                    username: username,

                    email: email,

                    role: "user"

                }

            );


        })


        .then(()=>{


            alert("Account created!");

            window.location.href = "index.html";


        })


        .catch((error)=>{


            alert(error.message);


        });


    });


}





// =====================
// LOGIN
// =====================


const loginButton = document.getElementById("loginButton");


if(loginButton){


    loginButton.addEventListener("click",()=>{


        const email =
        document.getElementById("email").value.trim();


        const password =
        document.getElementById("password").value;



        if(email === "" || password === ""){


            alert("Enter email and password!");

            return;


        }



        signInWithEmailAndPassword(

            auth,

            email,

            password

        )


        .then((result)=>{


            console.log(
                "Logged in:",
                result.user.uid
            );


            alert("Welcome back!");


            window.location.href="index.html";


        })


        .catch((error)=>{


            console.log(error);


            alert(error.message);


        });



    });


}

if(loginButton){


loginButton.onclick = ()=>{


const email =
document.getElementById("email").value;


const password =
document.getElementById("password").value;



signInWithEmailAndPassword(
auth,
email,
password
)


.then(()=>{


alert("Welcome back!");

window.location.href="index.html";


})


.catch(error=>{


alert(error.message);


});


};


}
