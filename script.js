function postMessage(){

    let name = document.getElementById("name").value;
    let message = document.getElementById("message").value;

    if(name === "" || message === ""){
        alert("Enter a name and message!");
        return;
    }

    let post = document.createElement("div");

    post.className = "post";

    post.innerHTML =
    "<b>🏴‍☠️ " + name + "</b><br>" +
    message;

    document.getElementById("messages")
    .prepend(post);

    document.getElementById("message").value = "";

}
