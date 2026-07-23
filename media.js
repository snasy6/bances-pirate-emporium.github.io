import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getDatabase,
ref,
push,
set,
onValue

}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



// FIREBASE

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



// ELEMENTS

const nameBox =
document.getElementById("mediaName");


const urlBox =
document.getElementById("mediaURL");


const addButton =
document.getElementById("addMedia");


const vault =
document.getElementById("vault");




// ADD MEDIA

addButton.onclick = ()=>{


const name =
nameBox.value.trim();


const url =
urlBox.value.trim();



if(name === "" || url === ""){


alert("Fill both fields!");

return;


}



const item =
push(ref(database,"mediaVault"));



set(item,{

name:name,

url:url,

createdAt:Date.now()

});



nameBox.value="";

urlBox.value="";


};





// LOAD VAULT

onValue(

ref(database,"mediaVault"),

(snapshot)=>{


vault.innerHTML="";



snapshot.forEach((child)=>{


const media =
child.val();



vault.innerHTML += `


<div class="post">


<h3>${media.name}</h3>


<img 
src="${media.url}" 
width="250"
>


</div>


`;


});


});
