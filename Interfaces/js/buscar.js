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
        document.getElementById("btnSearch").addEventListener("click", search);
    }else{
        window.location.href = "index.html";
    }
}

function search(){
    var id = document.getElementById('input-id').value;
    axios.get(url + '/employee/' + id, headers).then(function(res){
        console.log(res);
        var employee = res.data.message;
        switch(res.data.code){
            case 200: 
                console.log(`${employee.name}`);
                var body = document.querySelector("body");
                var tabla = document.createElement("table");
                var tblBody = document.createElement("tbody");
                var hilera = document.createElement("tr");
                for(var i=0; i<7; i++){
                    var celda = document.createElement("td");
                    switch(i){
                        case 0:
                            var textoCelda = document.createTextNode(`${employee[0].id}`);
                        break;
                        case 1:
                            var textoCelda = document.createTextNode(`${employee[0].name}`);
                        break;
                        case 2:
                            var textoCelda = document.createTextNode(`${employee[0].fs_name}`);
                        break;
                        case 3:
                            var textoCelda = document.createTextNode(`${employee[0].ms_name}`);
                        break;
                        case 4:
                            var textoCelda = document.createTextNode(`${employee[0].phone_num}`);
                        break;
                        case 5:
                            var textoCelda = document.createTextNode(`${employee[0].mail}`);
                        break;
                        case 6:
                            var textoCelda = document.createTextNode(`${employee[0].address}`);
                        break;
                    }
                    celda.appendChild(textoCelda);
                    hilera.appendChild(celda);
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
}