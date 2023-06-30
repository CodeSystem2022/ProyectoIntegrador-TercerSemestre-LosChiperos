console.log("modal ok");

// Definición del HTML del modal
const modalHtml = `
      <!-- Botón para abrir el modal -->
      <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0" id="myBtn">
        Nuevo Integrante
      </button>

      <!-- Contenido del modal -->
      <div id="myModal" class="modal">

        <div class="modal-content">
          <span class="close mb-5"> &times;</span>

          <!-- Campos de entrada -->
          <div class="grid-cols-2 ">
            <div class="border-2 py-2 px-3 rounded-xl mb-4">
              <input class="pl-2 outline-none border-none" type="text" name="" id="nombre" placeholder="Nombre" required />
            </div>
            <div class="border-2 py-2 px-3 rounded-2xl mb-4">
              <input class="pl-2 outline-none border-none" type="text" name="" id="apellido" placeholder="Apellido" required />
            </div>
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="role" placeholder="Rol" required />
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="descripcion" required placeholder="Descripción" />
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="linkedin" placeholder="Linkedin" />
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="github" placeholder="Github" />
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="twitter" placeholder="Twitter" />
          </div>

          <!-- Botón para enviar el formulario -->
          <button type="submit" id="btnRegistrar"
            class="block w-full hover:bg-sky-200 hover:text-indigo-800 bg-indigo-800 text-white mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onclick="registrar(event)">Registrar</button>
        </div>
      </div>
`;

// Comprobar condición (login ok)
if (true) {
  // Insertar el HTML del modal en el elemento con id "contentModal"
  document.getElementById("contentModal").innerHTML = modalHtml;
}

// Obtener el elemento del modal por su id
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal por su id
var btn = document.getElementById("myBtn");

// Obtener el elemento <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Abrir el modal cuando se hace clic en el botón
btn.onclick = function () {
  modal.style.display = "block";
};

// Cerrar el modal cuando se hace clic en <span> (x)
span.onclick = function () {
  modal.style.display = "none";
};

// Cerrar el modal cuando se hace clic en cualquier parte fuera del modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// URL de la API para agregar un miembro
const url = "https://api.vacunarg.site/team/agregar_member";

// Manejar el evento de clic del botón "Registrar"
btnRegistrar.onclick = function (event) {
  console.log("registrar");

  // Obtener los valores de los campos de entrada
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var role = document.getElementById("role").value;
  var descripcion = document.getElementById("descripcion").value;
  var linkedin = document.getElementById("linkedin").value;
  var github = document.getElementById("github").value;
  var twitter = document.getElementById("twitter").value;
  var file = document.getElementById("nombre").value;

  // Construir el objeto JSON con los datos del formulario
  let params = JSON.stringify({
    id: null,
    nombre: nombre,
    apellido: apellido,
    descripcion: descripcion,
    role: role,
    linkedin: linkedin,
    github: github,
    twitter: twitter,
    imgurl: "../img/team/",
  });
  console.log(params);

  // Enviar los datos del formulario al servidor
  postData(url, params)
    .then((json) => alert(json));

  // Cerrar el modal después de enviar los datos
  modal.style.display = "none";
};

// Función para enviar una solicitud POST
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}
