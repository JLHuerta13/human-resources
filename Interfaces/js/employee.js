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

