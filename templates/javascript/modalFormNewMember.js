console.log("modal ok");
const modalHtml = `
      <button class=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
        font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0" id="myBtn">
        Nuevo
        Integrante
      </button>

      <div id="myModal" class="modal">

        <!-- Modal content -->

        <div class="modal-content">
          <span class="close mb-5"> &times;</span>
          <div class="grid-cols-2 ">
            <div class="border-2 py-2 px-3 rounded-xl mb-4">
              <input class="pl-2 outline-none border-none" type="text" name="" id="nombre" placeholder="Nombre"
                required />
            </div>
            <div class="border-2 py-2 px-3 rounded-2xl mb-4">
              <input class="pl-2 outline-none border-none" type="text" name="" id="apellido" placeholder="Apellido"
                required />
            </div>

          </div>





          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="role" placeholder="Rol" required />
          </div>

          <div class="flex items-center border-2 py-2 px-3 rounded-2xl mb-4">
            <input class="pl-2 outline-none border-none" type="text" name="" id="descripcion" required
              placeholder="Descripción" />
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

          <button type="submit" id="btnRegistrar"
            class="block w-full hover:bg-sky-200 hover:text-indigo-800 bg-indigo-800 text-white mt-4 py-2 rounded-2xl text-white font-semibold mb-2"
            onclick="registrar(event)">Registrar</button>
        </div>

      </div>
`;
if(true){// login ok?
document.getElementById("contentModal").innerHTML = modalHtml;
}

var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
const url = 'https://api.vacunarg.site/team/agregar_member';
btnRegistrar.onclick = function(event) {
  console.log("registrar");
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var role = document.getElementById('role').value;
    var descripcion = document.getElementById('descripcion').value;
    var linkedin = document.getElementById('linkedin').value;
    var github = document.getElementById('github').value;
    var twitter = document.getElementById('twitter').value;
    var file = document.getElementById('nombre').value;

    let params = JSON.stringify({
      "id" : null,
      "nombre": nombre,
      "apellido": apellido,
      "descripcion": descripcion,
      "role": role,
      "linkedin": linkedin,
      "github": github,      
      "twitter": twitter,
      "imgurl": "../img/team/",
     
      
    });
    console.log(params);
 
    postData(url , params)
       .then((json) => alert(json)
    
    
    );

    modal.style.display = "none";
   
}
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}