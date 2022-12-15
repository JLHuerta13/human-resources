window.onload = init;

function init(){
    if(!localStorage.getItem("token")){
        document.querySelector('.btn-login').addEventListener('click', login);
        document.querySelector('.btn-signin').addEventListener('click', signin);
    }else{
        window.location.href="employee.html";
    }
}

function login(){
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/login',
        data: {
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res){
        switch(res.data.code){
            case 200: 
                alert("Inicio de Sesión Correcto");
                localStorage.setItem("token", res.data.message);
                window.location.href = "employee.html";
            break;
            case 401:
                alert("Usuario y/o Contraseña Incorrecto");
            break;
            case 500:
                alert("Campos Incompletos");
            break;
        }
    }).catch(function(err){
        console.log(err);
    })
}

function signin(){
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-remail').value;
    var pass = document.getElementById('input-repassword').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/user/signin',
        data: {
            user_name: name,
            user_mail: mail,
            user_password: pass
        }
    }).then(function(res){
        console.log(res);
        alert("Registro Exitoso");
    }).catch(function(err){
        console.log(err);
    })
}