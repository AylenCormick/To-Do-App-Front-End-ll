/* ---------------------------------- texto --------------------------------- */

// let errores = [];

function validarTexto(texto) {

    let regex = new RegExp("^[A-Z]+$", "i");

    if (texto.length < 3 || texto === null) {
        errores.push("El nombre y el apellido deben tener mas de 3 caracteres");
    } else if (!regex.test(texto.toUpperCase())) {
        errores.push("El nombre y el apellido no deben incluir numeros o caracteres especiales");
    } else {
        return true;
    }

}


/* ---------------------------------- email --------------------------------- */

function validarEmail(email) {

    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    if (!regex.test(email)) {
        errores.push("Email invalido");
    } else {
    return true;
    }

}


/* -------------------------------- password -------------------------------- */
function validarContrasenia(contrasenia) {

    let regexLetras = new RegExp("^[A-Z]+$", "i");
    let regexNumeros = new RegExp("^[0-9]+$")

    if (contrasenia.length < 6 || regexLetras.test(contrasenia.toUpperCase()) || regexNumeros.test(contrasenia)) {
        errores.push("La contraseña debe tener 6 caracteres o mas, y debe incluir numeros y letras");
    } else {
        return true;
    }

}

function compararContrasenias(contrasenia_1, contrasenia_2) {

    if (contrasenia_1 === contrasenia_2) {
        return true;
    } else {
        errores.push("Las contraseñas no coinciden");
        return false;
    }

}

// formulario.innerHTML += "<div class='valErr'></div>"
// const divErr = document.querySelector(".valErr");

function renderizarErrores(nombre, apellido, email, contrasenia, contraseniados) {

    errores = [];
    const de = document.querySelector(".divError");
    
    if (de != null) {
        formulario.removeChild(de.firstElementChild);
    }
    
    validarTexto(nombre);
    validarTexto(apellido);
    validarEmail(email);
    validarContrasenia(contrasenia);
    compararContrasenias(contrasenia, contraseniados);

    const divErr = document.createElement('div');
    divErr.classList.add("divError");
    
        errores.forEach(err => {
            divErr.innerHTML += `<p class="pErr"> ${err} </p>`
        })
    
    formulario.appendChild(divErr);

        // divErr.style.margin = "10px"
    // const pError = document.querySelectorAll(".pErr");
    // pError.forEach(p => {
    //     p.style.color = "red";
    //     p.style.margin = "5px";
    // });

    console.log(errores);

    if (errores.length <= 0) {
        return true;
    } else {
        return false;
    }
}


