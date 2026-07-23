alert("SCRIPT FILE LOADED");
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    get,
    push,
    set,
    remove,
    onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


// =====================
// FIREBASE
// =====================

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



// =====================
// HTML ELEMENTS
// =====================

const welcome = document.getElementById("welcome");

const messageBox = document.getElementById("message");

const postButton = document.getElementById("postButton");

const messagesBox = document.getElementById("messages");

const logoutButton = document.getElementById("logoutButton");

const adminPanel = document.getElementById("adminPanel");

const clearChatButton = document.getElementById("clearChatButton");



// =====================
// USER VARIABLES
// =====================

let currentUser = null;

let username = "";

let isAdmin = false;



// =====================
// LOGIN
// =====================

onAuthStateChanged(auth, async(user)=>{


    if(!user){


        currentUser = null;

        username = "";

        isAdmin = false;


        welcome.innerHTML = "⚠️ Please login";

        postButton.disabled = true;


        return;

    }



    currentUser = user;



    const userSnap = await get(

        ref(database, "users/" + user.uid)

    );



    if(userSnap.exists()){


        const data = userSnap.val();



        username = data.username;



        isAdmin =

        data.role === "admin" ||

        data.role === "owner";



        welcome.innerHTML =

        "🏴‍☠️ Welcome " + username;



        postButton.disabled = false;



        if(isAdmin && adminPanel){

            adminPanel.style.display = "block";

        }


    }


});




// =====================
// POST MESSAGE
// =====================

postButton.onclick = async()=>{


    if(!currentUser){

        alert("Login first!");

        return;

    }



    let text = messageBox.value.trim();



    if(text === ""){

        return;

    }



    let messageRef = push(

        ref(database,"messages")

    );



    await set(messageRef,{

        userID: currentUser.uid,

        username: username,

        message: text,

        createdAt: Date.now()

    });



    messageBox.value = "";

};




// =====================
// LOAD MESSAGES
// =====================

onValue(

ref(database,"messages"),

(snapshot)=>{


    messagesBox.innerHTML = "";


    let posts = [];


    snapshot.forEach((child)=>{


        posts.push({

            id: child.key,

            ...child.val()

        });


    });



    posts.sort((a,b)=>{


        return b.createdAt - a.createdAt;


    });



    posts.forEach((post)=>{


        let buttons = "";


        if(isAdmin){


            buttons = `

            <br>

            <button onclick="deleteMessage('${post.id}')">

            🗑 Delete

            </button>

            `;


        }



        messagesBox.innerHTML += `


        <div class="post">


        <b>🏴‍☠️ ${post.username}</b>


        <p>${post.message}</p>


        <small>

        ${new Date(post.createdAt).toLocaleString()}

        </small>


        ${buttons}


        </div>


        `;


    });


});
// =====================
// ADMIN DELETE
// =====================

window.deleteMessage = function(id){


    if(!isAdmin){

        return;

    }


    remove(

        ref(database,"messages/" + id)

    );


};





// =====================
// ADMIN CLEAR CHAT
// =====================

if(clearChatButton){


    clearChatButton.onclick = ()=>{


        if(!isAdmin){

            return;

        }


        if(confirm("Delete all messages?")){


            remove(

                ref(database,"messages")

            );


        }


    };


}





// =====================
// LOGOUT
// =====================

logoutButton.onclick = ()=>{


    signOut(auth);


};
