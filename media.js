import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import {
getDatabase,
ref,
onValue
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";



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



const grid = document.getElementById("mediaGrid");



onValue(

ref(database,"media"),

(snapshot)=>{


grid.innerHTML="";


snapshot.forEach((item)=>{


let data=item.val();



grid.innerHTML += `


<div class="post">


<h3>
🏴‍☠️ ${data.name}
</h3>


<img 

src="${data.url}"

class="vaultImage">


<br>


<a href="${data.url}" target="_blank">

Open

</a>


</div>


`;


});


}

);


});
