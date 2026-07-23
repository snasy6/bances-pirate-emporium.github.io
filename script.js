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



// ELEMENTS

const welcome = document.getElementById("welcome");
const messageBox = document.getElementById("message");
const postButton = document.getElementById("postButton");
const messagesBox = document.getElementById("messages");
const logoutButton = document.getElementById("logoutButton");

const adminPanel = document.getElementById("adminPanel");
const clearChatButton = document.getElementById("clearChatButton");



// USER DATA

let currentUser = null;
let username = "";
let isAdmin = false;



// =========================
// EMOTE SYSTEM
// =========================

function convertEmotes(text){


    const emotes = {


        ":ship:": "ship.gif",

        ":pirate:": "pirate.gif",

        ":skull:": "skull.gif",

        ":lol:": "lol.gif",

        ":fire:": "fire.gif"


    };



    for(let code in emotes){


        text = text.replaceAll(

            code,

            `<img class="emote" src="smilies/${emotes[code]}">`

        );


    }


    return text;


}




// LOGIN CHECK

onAuthStateChanged(auth, async (user)=>{


    if(!user){

        welcome.innerHTML = "⚠️ Please login";

        postButton.disabled = true;

        return;

    }


    currentUser = user;


    const userData = await get(
        ref(database,"users/"+user.uid)
    );


    if(userData.exists()){


        const data = userData.val();


        username = data.username;


        isAdmin = 
        data.role === "admin" || 
        data.role === "owner";



        console.log("USERNAME:", username);

        console.log("ADMIN:", isAdmin);



        welcome.innerHTML =
        "🏴‍☠️ Welcome " + username;



        postButton.disabled = false;



        if(isAdmin){

            adminPanel.style.display="block";

        }


    }

});





// POST MESSAGE

postButton.onclick = ()=>{


    if(!currentUser){

        alert("Login first!");

        return;

    }



    const text =
    messageBox.value.trim();



    if(text===""){

        return;

    }



    const newMessage =
    push(ref(database,"messages"));



    set(newMessage,{


        userID:currentUser.uid,


        username:username,


        message:text,


        createdAt:Date.now()


    });



    messageBox.value="";


};







// LOAD MESSAGES

onValue(
ref(database,"messages"),

(snapshot)=>{


    messagesBox.innerHTML="";


    let posts=[];



    snapshot.forEach((child)=>{


        posts.push({

            id:child.key,

            ...child.val()

        });


    });



    // NEWEST FIRST

    posts.sort((a,b)=>{


        return b.createdAt - a.createdAt;


    });




    posts.forEach((post)=>{


        let buttons="";



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


        <p>${convertEmotes(post.message)}</p>


        <small>

        ${new Date(post.createdAt).toLocaleString()}

        </small>


        ${buttons}


        </div>


        `;



    });


});







// ADMIN DELETE

window.deleteMessage = function(id){


    if(!isAdmin){

        return;

    }


    remove(
        ref(database,"messages/"+id)
    );


};







// ADMIN CLEAR CHAT

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






// LOGOUT

logoutButton.onclick = ()=>{


    signOut(auth)

    .then(()=>{


        window.location.href="login.html";


    });


};


};
