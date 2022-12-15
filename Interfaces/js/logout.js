window.onload = init;

function init(){
    if(localStorage.getItem("token")){
        document.getElementById("btnlogout").addEventListener('click', logout);
    }else{
        window.location.href="index.html";
    }
}

function logout(){
    localStorage.removeItem("token");
    window.location.href="index.html";
}