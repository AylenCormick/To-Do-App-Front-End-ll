window.addEventListener('load', function () {
/* ---------------------- obtenemos variables globales ---------------------- */
const nombre = document.querySelector("#inputNombre");
const apellido = document.querySelector("#inputApellido");
const email = document.querySelector("#inputEmail");
const contrasenia = document.querySelector("#inputPassword");
const confContrasenia = document.querySelector("#inputPasswordRepetida");
const formulario = document.forms[0];
const inputs = document.querySelectorAll("#formulario input")
const url = "https://todo-api.ctd.academy/v1";

// const expresiones = {
// 	nombre: /^[a-zA-ZÀ-ÿ\s]{3,20}$/, // Letras y espacios, pueden llevar acentos.
// 	password: /^.{4,12}$/, // 4 a 12 digitos.
// 	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
// 	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
// }

/* -------------------------------------------------------------------------- */
/*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
/* -------------------------------------------------------------------------- */

// inputs.forEach(input => {
//     input.addEventListener("blur", (e) => {
//         switch (e.target.name) {
//             case "nombre":
//                 if(!expresiones.nombre.test(e.target.value)) {
//                     formulario.innerHTML += "<div><p>err</p></div>"
//                 } else {
//                     formulario.innerHTML += "<div><p>ok</p></div>"
//                 }
//             case "apellido":

//             case "email":

//             case "password":

//             case "password-rtp":
            
//             break;
        
//             default:
//                 break;
//         }
//     })
// })


formulario.addEventListener('submit', function (event) {

    event.preventDefault();

    if (renderizarErrores(nombre.value, apellido.value, email.value, contrasenia.value, confContrasenia.value)) {
        crearUsuario();
    } 

});

//--------------------------------------------------------------------

function crearUsuario() {
    const objeto = {
        firstName : nombre.value,
        lastName : apellido.value,
        email : email.value,
        password : contrasenia.value
    }
    
    console.log(objeto);
    
    const settings = {
        method : "POST",
        body : JSON.stringify(objeto),
        headers : {
            "Content-Type": "application/json"
        }
    }
    
    realizarRegister(settings);
    formulario.reset();
}

/* -------------------------------------------------------------------------- */
/*                    FUNCIÓN 2: Realizar el signup [POST]                    */
/* -------------------------------------------------------------------------- */
function realizarRegister(settings) {
    
    fetch(`${url}/users`, settings)
        .then (respuesta => {
            console.log(respuesta);
            if (!respuesta.ok) {
                alert("Alguno de los datos es incorrecto");
            } 
            return respuesta.json();
        })
        .then (data => {
            console.log(data);
            if (data.jwt) {
                localStorage.setItem("token", JSON.stringify(data.jwt));
                location.replace("./index.html");
            }
        })
        .catch(error => {
            console.log("Promesa rechazada");
            console.log(error);
        })
    
};  


});