import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {

getDatabase,
ref,
get,
update

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


import {

getAuth,
onAuthStateChanged

}

from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";



const firebaseConfig = {


apiKey:"AIzaSyC-3DzWj-EY8ycWAtibBDqNkzojalYRjbI",

authDomain:"bances-pirate-emporium.firebaseapp.com",

databaseURL:"https://bances-pirate-emporium-default-rtdb.firebaseio.com",

projectId:"bances-pirate-emporium",

storageBucket:"bances-pirate-emporium.firebasestorage.app",

messagingSenderId:"193085375114",

appId:"1:193085375114:web:4380e8157dc1d93d96a373"

};



const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const auth = getAuth(app);



const ownerCheck =
document.getElementById("ownerCheck");


const tools =
document.getElementById("staffTools");



let owner = false;



onAuthStateChanged(auth, async(user)=>{


if(!user){

ownerCheck.innerHTML =
"❌ Login required";

return;

}



const snap =
await get(
ref(db,"users/"+user.uid)
);



if(!snap.exists()) return;



const data=snap.val();



if(data.role==="owner"){


owner=true;


ownerCheck.innerHTML =
"👑 Owner Access Granted";


tools.style.display="block";


}

else{


ownerCheck.innerHTML =
"❌ Owner only";


}



});





document
.getElementById("searchButton")
.onclick=async()=>{


if(!owner)return;



const name =
document.getElementById("searchUser").value
.trim();



const users =
await get(ref(db,"users"));



let found=false;



users.forEach((user)=>{


let data=user.val();



if(data.username===name){


found=true;



document.getElementById("result").innerHTML=`

<h3>${data.username}</h3>

<p>
Current Rank:
${data.role}
</p>


<button onclick="changeRank('${user.key}','moderator')">
Make Moderator
</button>


<button onclick="changeRank('${user.key}','admin')">
Make Admin
</button>


<button onclick="changeRank('${user.key}','user')">
Remove Staff
</button>


`;



}


});



if(!found){

document.getElementById("result").innerHTML=
"User not found";

}


};





window.changeRank=async(uid,rank)=>{


if(!owner)return;


await update(

ref(db,"users/"+uid),

{

role:rank

}

);



alert("Rank changed!");

};
