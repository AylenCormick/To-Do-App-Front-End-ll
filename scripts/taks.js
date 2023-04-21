// SEGURIDAD: Si no se encuentra en localStorage info del usuario
// no lo deja acceder a la página, redirigiendo al login inmediatamente.

if (!localStorage.token) {
  location.replace("../index.html");
}

/* ------ comienzan las funcionalidades una vez que carga el documento ------ */
window.addEventListener('load', function () {

  /* ---------------- variables globales y llamado a funciones ---------------- */
  const urlTareas = "https://todo-api.ctd.academy/v1/tasks";
  const urlUsuario = "https://todo-api.ctd.academy/v1/users/getMe";
  const token = JSON.parse(localStorage.token);

  const formCrearTarea = document.querySelector(".nueva-tarea");
  const btnCerrarSesion = document.querySelector("#closeApp");
  const main = document.querySelector("main");

  obtenerNombreUsuario();
  consultarTareas();


  /* -------------------------------------------------------------------------- */
  /*                          FUNCIÓN 1 - Cerrar sesión                         */
  /* -------------------------------------------------------------------------- */

  btnCerrarSesion.addEventListener('click', function () {
  
    const cerrarSesion = confirm("Seguro que desea cerrar sesion?");
    if (cerrarSesion) {
      localStorage.clear();
      location.replace("./index.html");
    }
  
  });

  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 2 - Obtener nombre de usuario [GET]                */
  /* -------------------------------------------------------------------------- */

  function obtenerNombreUsuario() {

    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    };

    console.log("Consultando el usuario");

    fetch(urlUsuario, settings)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const userName = document.querySelector(".user-info p");
        userName.innerHTML = data.firstName;
      })
      .catch(err => console.log(err))

  };


  /* -------------------------------------------------------------------------- */
  /*                 FUNCIÓN 3 - Obtener listado de tareas [GET]                */
  /* -------------------------------------------------------------------------- */

  function consultarTareas() {

    const settings = {
      method: "GET",
      headers: {
        authorization: token
      }
    };

    console.log("Consultando Tareas...");

    fetch(urlTareas, settings)
      .then(response => {
        return response.json();
      })
      .then(tareas => {
        console.log("Tareas del usuario...");
        console.table(tareas);

        renderizarTareas(tareas);
        botonesCambioEstado();
        botonBorrarTarea();
      })
      .catch(err => {
        console.log(err);
      })

  };


  /* -------------------------------------------------------------------------- */
  /*                    FUNCIÓN 4 - Crear nueva tarea [POST]                    */
  /* -------------------------------------------------------------------------- */
  
  const nuevaTarea = document.querySelector("#nuevaTarea");

  formCrearTarea.addEventListener('submit', function (event) {

    event.preventDefault()
    
    const contenido = {
        description: nuevaTarea.value,
        completed: false
    }
    
    const settings = {
      method: "POST",
      headers: {
        authorization: token,
        "content-type": "application/json" 
      },
      body: JSON.stringify(contenido)
    }

    fetch(urlTareas, settings)
      .then(response => {
        return response.json();
      })
      .then(data => {
        consultarTareas();
      })
      .catch(error => {
        console.log(error);
      })

      formCrearTarea.reset();

  });



  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 5 - Renderizar tareas en pantalla                 */
  /* -------------------------------------------------------------------------- */

  function renderizarTareas(listado) {
    
    const tareasPendientes = document.querySelector(".tareas-pendientes");
    const tareasTerminadas = document.querySelector(".tareas-terminadas");
    const numeroFinalizadas = document.querySelector("#cantidad-finalizadas");
    
    tareasPendientes.innerHTML = "";
    tareasTerminadas.innerHTML = "";

    let contador = 0;
    numeroFinalizadas.innerHTML = contador;

  listado.forEach(tarea => {
    let fecha = new Date(tarea.createdAt);
    
    if (tarea.completed) {
      contador++;

      tareasTerminadas.innerHTML += `
      <li class="tarea">
        <div class="hecha">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <div class="descripcion">
          <p class="nombre">${tarea.description}</p>
          <div class="cambios-estados">
            <button class="change incompleta" id="${tarea.id}">
              <i class="fa-solid fa-rotate-left"></i>
            </button>
            <button class="borrar" id="${tarea.id}">
              <i class="fa-regular fa-trash-can"></i>
            </button>
          </div>
        </div>
      </li>
      `
    } else {
      tareasPendientes.innerHTML += `
      <li class="tarea">
        <button class="change" id="${tarea.id}">
          <i class="fa-regular fa-circle"></i>
        </button>
        <div class= "descripcion">
          <p class="nombre">${tarea.description}</p>
          <p class="timestamp">${fecha.toLocaleDateString()}</p>
        </div>
      </li>
      `
    }

    numeroFinalizadas.innerText = contador;
  });

  };

  /* -------------------------------------------------------------------------- */
  /*                  FUNCIÓN 6 - Cambiar estado de tarea [PUT]                 */
  /* -------------------------------------------------------------------------- */
  

  function botonesCambioEstado() {
    
    const btns = document.querySelectorAll(".change");

    btns.forEach(btn => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();

        const objeto = {}
        const idTarea = e.target.id;
  
        if (e.target.classList.contains("incompleta")) {
          objeto.completed = false;
        } else {
          objeto.completed = true;
        }
  
        const url = `${urlTareas}/${idTarea}`
  
        const settings = {
          method: "PUT",
          headers: {
            "Authorization": token,
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(objeto)
        }
  
        fetch(url, settings)
          .then(response => {
            console.log(response.status);
            consultarTareas();
          })
          .catch(err => {
            console.log(err);
          })

      })
    })


}


  /* -------------------------------------------------------------------------- */
  /*                     FUNCIÓN 7 - Eliminar tarea [DELETE]                    */
  /* -------------------------------------------------------------------------- */
  function botonBorrarTarea() {

    const btns = document.querySelectorAll(".borrar");

    btns.forEach(btn => {

      btn.addEventListener("click", function (e) {
  
        e.preventDefault();
          
        const idTarea = e.target.id;
        const url = `${urlTareas}/${idTarea}`
  
          const settings = {
            method: "DELETE",
            headers: {
              "Authorization": token
            }
          }
          
          fetch(url, settings)
          .then(response => {
            console.log("Borrando tarea...");
            console.log(response.status);
            consultarTareas();
          })
          .catch(error => {
            console.log(error);
          })
  
      })

    })
    

  };

});