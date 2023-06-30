const apiUrl = "https://api.vacunarg.site/buscar_paciente";

// Función para validar el número de CUIL utilizando una expresión regular
function isValidCuil(cuil) {
    var re = /^([20|23|24|27]{2})-([0-9]{8})-([0-9]{1})$/;
    return re.test(cuil);
}

// Manejador de evento para el envío del formulario
document.getElementById("vaccineForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevenir el comportamiento predeterminado de enviar el formulario

    var cuil = document.getElementById("cuil").value;
    if (!isValidCuil(cuil)) {
        document.getElementById("cuilError").classList.remove("hidden"); // Mostrar mensaje de error en caso de CUIL inválido
        return;
    }

    // Realizar una solicitud POST a la API
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            cuil: cuil
        })
    })
        .then((response) => {
            if (!response.ok) throw new Error(response.status); // Lanzar un error si la respuesta no es exitosa
            else return response.json(); // Analizar los datos de la respuesta como JSON y devolverlos como una promesa
        })
        .then((data) => {
            console.log(data);

            if (data.length === 0) {
                // Mostrar un mensaje de error en caso de no encontrar datos para el CUIL proporcionado
                Swal.fire({
                    title: 'Error!',
                    text: 'No se encontraron datos para el CUIL proporcionado.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                return;
            }

            let paciente = data[0];

            // Formatear las fechas de nacimiento y aplicación en un formato legible
            let fechaNacimiento = new Date(paciente.fecha_nacimiento);
            let formattedFechaNacimiento = fechaNacimiento.getDate() + '/' + (fechaNacimiento.getMonth() + 1) +
                '/' + fechaNacimiento.getFullYear();

            let fechaAplicacion = new Date(paciente.fecha_aplicacion);
            let formattedFechaAplicacion = fechaAplicacion.getDate() + '/' + (fechaAplicacion.getMonth() + 1) +
                '/' + fechaAplicacion.getFullYear();

            // Mostrar un mensaje de éxito con los datos del paciente
            Swal.fire({
                title: 'Éxito!',
                html: 'Nombre: ' + paciente.nombre + '<br>' +
                    'Apellido: ' + paciente.apellido + '<br>' +
                    'CUIL: ' + paciente.cuil + '<br>' +
                    'Fecha de Nacimiento: ' + formattedFechaNacimiento + '<br>' +
                    'Dosis: ' + paciente.dosis + '<br>' +
                    'Fecha de Aplicación: ' + formattedFechaAplicacion + '<br>' +
                    'Centro de Salud: ' + paciente.centro_salud + '<br>' +
                    'Nombre de Vacuna: ' + paciente.nombre_vacuna + '<br>' +
                    'Lote de Vacuna: ' + paciente.lote_vacuna.replace(/\n/g, '<br>'), // Reemplaza '\n' con '<br>' para saltos de línea
                icon: 'success',
                confirmButtonText: 'Ok'
            });

        })
        .catch((error) => {
            console.log(error); // Mostrar cualquier error en la consola
        });
});

// Evento que se dispara cuando se carga el contenido de la página
document.addEventListener("DOMContentLoaded", function () {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // Cuánto tiempo te gustaría que dure la animación

    // Observador de intersección para activar la animación cuando el elemento esté en la vista
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-count');
                        const count = +counter.innerText.replace(/\./g, '');

                        const increment = target / speed;

                        if (count < target) {
                            counter.innerText = Math.ceil(count + increment).toLocaleString('es-ES');
                            setTimeout(updateCount, 1);
                        } else {
                            counter.innerText = target.toLocaleString('es-ES');
                        }
                    }

                    updateCount();
                });

                observer.disconnect(); // Detener la observación después de activar la animación
            }
        });
    });

    observer.observe(document.querySelector('section.bg-cover')); // Observar el elemento que activará la animación
});
