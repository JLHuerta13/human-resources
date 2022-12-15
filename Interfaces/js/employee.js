window.onload = init;

var headers = {};
var url = "http://localhost:3000";

function init(){
    if(localStorage.getItem("token")){
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        loadEmployees();
        document.getElementById("btnInsert").addEventListener("click", insert);
        document.getElementById("btnUpdate").addEventListener("click", update);
        document.getElementById("btnDelete").addEventListener("click", remove);
        document.getElementById("btnSearch").addEventListener("click", search);
        document.getElementById("btnlogout").addEventListener('click', logout);
    }else{
        window.location.href = "index.html";
    }
}

function loadEmployees(){
    axios.get(url + "/employee", headers)
    .then(function(res){
        console.log(res);
        displayEmployees(res.data.message);
    }).catch(function(err){
        console.log(err);
    })
}

function displayEmployees(employee){
    var body = document.querySelector("body");
    var tabla = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for(var i=0; i<employee.length; i++){
        var hilera = document.createElement("tr");
        for(var j=0; j<7; j++){
            var celda = document.createElement("td");
            switch(j){
                case 0:
                    var textoCelda = document.createTextNode(`${employee[i].id}`);
                break;
                case 1:
                    var textoCelda = document.createTextNode(`${employee[i].name}`);
                break;
                case 2:
                    var textoCelda = document.createTextNode(`${employee[i].fs_name}`);
                break;
                case 3:
                    var textoCelda = document.createTextNode(`${employee[i].ms_name}`);
                break;
                case 4:
                    var textoCelda = document.createTextNode(`${employee[i].phone_num}`);
                break;
                case 5:
                    var textoCelda = document.createTextNode(`${employee[i].mail}`);
                break;
                case 6:
                    var textoCelda = document.createTextNode(`${employee[i].address}`);
                break;
            }
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
        //body.innerHTML += `<h3>${employee[i].name}</h3>`;
    }
    tabla.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tabla);
    // modifica el atributo "border" de la tabla y lo fija a "2";
    tabla.setAttribute("border", "2");
    tabla.setAttribute("cellspacing", "20");
    tabla.setAttribute("bgcolor", "black");
}

function insert(){
    var name = prompt("Ingresa el nombre de empleado", "nombre de empleado");
    var fs_name = prompt("Ingresa el apellido paterno de empleado", "apellido paterno de empleado");
    var ms_name = prompt("Ingresa el apellido materno de empleado", "apellido materno de empleado");
    var phone_num = prompt("Ingresa el telefono de empleado", "telefono de empleado");
    var mail = prompt("Ingresa el correo de empleado", "correo de empleado");
    var address = prompt("Ingresa la dirección de empleado", "dirección de empleado");
    if(name&&fs_name&&ms_name&&phone_num&&mail&&address){
        axios({
            method: 'post',
            url: 'http://localhost:3000/employee/',
            data: {
                name: name,
                fs_name: fs_name,
                ms_name: ms_name,
                phone_num: phone_num,
                mail: mail,
                address: address
            },
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }).then(function(res){
            switch(res.data.code){
                case 200: 
                alert("Empleado Añadido Correctamente");
                window.location.href="employees.html";
                break;
                case 404:
                    alert("Empleado No Encontrado");
                break;
                case 500:
                    alert("Campos Incompletos");
                break;
            }
        }).catch(function(err){
            console.log(err);
        })
    }else{
        alert("Campos Incompletos");
    }
}

function update(){
    var id = prompt("Ingresa id del empleado", "id de empleado");
    if(id){
        var name = prompt("Ingresa el nuevo nombre de empleado", "nombre de empleado");
        var fs_name = prompt("Ingresa el nuevo apellido paterno de empleado", "apellido paterno de empleado");
        var ms_name = prompt("Ingresa el nuevo apellido materno de empleado", "apellido materno de empleado");
        var phone_num = prompt("Ingresa el nuevo telefono de empleado", "telefono de empleado");
        var mail = prompt("Ingresa el nuevo correo de empleado", "correo de empleado");
        var address = prompt("Ingresa la nueva dirección de empleado", "dirección de empleado");
        axios({
            method: 'put',
            url: 'http://localhost:3000/employee/' + id,
            data:{
                name: name,
                fs_name: fs_name,
                ms_name: ms_name,
                phone_num: phone_num,
                mail: mail,
                address: address
            },
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }).then(function(res){
            switch(res.data.code){
                case 200: 
                alert("Empleado Actualizado Correctamente");
                window.location.href="employee.html";
                break;
                case 404:
                    alert("Empleado No Encontrado");
                break;
                case 500:
                    alert("Campos Incompletos");
                break;
            }
        }).catch(function(err){
            console.log(err);
        })
    }else{
        alert("Datos Incompletos");
    }
}

function remove(){
    var id = prompt("Ingresa el id del empleado: ", "id de empleado");
    if(id){
        axios({
            method: 'delete',
            url: 'http://localhost:3000/employee/' + id,
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }).then(function(res){
            switch(res.data.code){
                case 200: 
                alert("Empleado Eliminado Correctamente");
                window.location.href="employees.html";
                break;
                case 404:
                    alert("Empleado No Encontrado");
                break;
                case 500:
                    alert("Campos Incompletos");
                break;
            }
        }).catch(function(err){
            console.log(err);
        })
    }else{
        alert("Datos Incompletos");
    } 
}

function search(){
    window.location.href="busqueda.html";
}

function logout(){
    localStorage.removeItem("token");
    window.location.href="index.html";
}
