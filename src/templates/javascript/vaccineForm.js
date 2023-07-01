// Manejador de evento para el envío del formulario
document.getElementById("vaccineForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado de enviar el formulario

    // Obtener los valores de los campos del formulario
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var cuil = document.getElementById("cuil").value;
    var fechaNacimientoRaw = document.getElementById("fechaNacimiento").value;
    var fechaNacimiento = new Date(fechaNacimientoRaw); // Convertir la fecha de nacimiento en un objeto Date
    console.log(fechaNacimiento.toISOString()); // Mostrar la fecha de nacimiento en formato ISO en la consola

    var loteVacuna = document.getElementById("loteVacuna").value;
    var fechaAplicacion = document.getElementById("fechaAplicacion").value;
    var centroSalud = document.getElementById("centroSalud").value;
    var vacuna = document.getElementById("vacuna").value;
    var dosis = document.getElementById("dosis").value;

    console.log('Preparing to send data to server...'); // 1. Mostrar un mensaje antes de enviar los datos al servidor

    // Validar el número de CUIL utilizando una expresión regular
    if (!isValidCuil(cuil)) {
        document.getElementById("cuilError").classList.remove("hidden"); // Mostrar mensaje de error en caso de CUIL inválido
        return;
    }

    // Realizar una solicitud POST a la API
    fetch('https://api.vacunarg.site/agregar_paciente', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            apellido: surname,
            cuil: cuil,
            fecha_nacimiento: fechaNacimiento,
            dosis: dosis,
            fecha_aplicacion: fechaAplicacion,
            centro_salud: centroSalud,
            nombre_vacuna: vacuna,
            lote_vacuna: loteVacuna
        })
    })
        .then(response => {
            console.log('Response received from server: ', response); // 2. Mostrar la respuesta cruda del servidor en la consola
            return response.json(); // Analizar los datos de la respuesta como JSON y devolverlos como una promesa
        })
        .then(data => {
            console.log('Parsed response data: ', data); // 3. Mostrar los datos analizados de la respuesta en la consola
            if (data.success) { // Verificar si la respuesta indica éxito
                // Mostrar un mensaje de éxito utilizando Swal.fire y recargar la página después de confirmar el mensaje
                Swal.fire({
                    title: 'Éxito!',
                    text: 'Su vacuna ha sido registrada correctamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then((result) => {
                    if (result.isConfirmed) {
                        location.reload(); // Recargar la página
                    }
                })
            } else {
                // Mostrar un mensaje de error en caso de que la respuesta indique un error
                Swal.fire({
                    title: 'Error!',
                    text: 'Ocurrió un error al registrar la vacuna.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error); // 4. Mostrar cualquier error en la consola
            // Mostrar un mensaje de error genérico en caso de error durante la solicitud
            Swal.fire({
                title: 'Error!',
                text: 'Ocurrió un error al registrar la vacuna.',
                icon: 'error',
                confirmButtonText: 'Ok'
            })
        });
});

// Función para validar el número de CUIL utilizando una expresión regular
function isValidCuil(cuil) {
    var re = /^([20|23|24|27]{2})-([0-9]{8})-([0-9]{1})$/;
    return re.test(cuil);
}
