

window.addEventListener('load', function () {
    /* ---------------------- obtenemos variables globales ---------------------- */

    const nptEmail = document.querySelector("#inputEmail");
    const nptPassword = document.querySelector("#inputPassword");
    const form = document.querySelector("form");
    const btnSub = document.querySelector("button");
    const url = "https://todo-api.ctd.academy/v1";


    /* -------------------------------------------------------------------------- */
    /*            FUNCIÓN 1: Escuchamos el submit y preparamos el envío           */
    /* -------------------------------------------------------------------------- */
    form.addEventListener('submit', function (event) {

        event.preventDefault();
    
        if (validarEmail(nptEmail.value) && validarContrasenia(nptPassword.value)) {

            const objeto = {
                email : nptEmail.value,
                password : nptPassword.value
            }
        
            const settings = {
                method : "POST",
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(objeto)
            }

            realizarLogin(settings);
            form.reset();
        } 
    
    });


    /* -------------------------------------------------------------------------- */
    /*                     FUNCIÓN 2: Realizar el login [POST]                    */
    /* -------------------------------------------------------------------------- */


    function realizarLogin(carga) {
    
        fetch(`${url}/users/login`, carga)
        .then (respuesta => {
            if (!respuesta.ok) {
                alert("Alguno de los datos es incorrecto");
            }
            return respuesta.json();
        })
        .then (data => {
            console.log("Promesa cumplida");
            console.log(data);
            if (data.jwt) {
                localStorage.setItem("token", JSON.stringify(data.jwt));
                location.replace("./loading.html");
            }
        })
        .catch(error => {
            console.log("Promesa rechazada");
            console.log(error);
        })

    };
});