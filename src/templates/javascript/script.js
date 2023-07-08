function login(event) {
    event.preventDefault(); // Prevenir que el formulario se envíe

    // Obtener los valores de usuario y contraseña del formulario
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;

    // Enviar una solicitud POST a la URL de autenticación
    fetch('https://api.reciclarg.cloud/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }), // Enviar datos de usuario y contraseña en el cuerpo de la solicitud
    })
        .then((response) => {
            if (response.status === 200) { // Comprobar si la respuesta tiene un estado 200 (éxito)
                // Mostrar una alerta de éxito utilizando la biblioteca SweetAlert
                Swal.fire({
                    icon: 'success', // Icono de éxito
                    title: '¡Hecho!', // Título de la alerta
                    text: 'Bienvenido: ' + username, // Mensaje de bienvenida que incluye el nombre de usuario
                    confirmButtonText: 'Ok' // Texto del botón de confirmación
                }).then((result) => {
                    // Redirigir a "index2.html" cuando el usuario hace clic en "OK" en la alerta
                    if (result.isConfirmed) {
                        window.location.href = '/index2.html';
                    }
                })
            } else {
                console.error('Error:', response.status); // Imprimir en la consola el estado de error de la respuesta
            }
        })
        .catch((error) => {
            console.error('Error:', error); // Imprimir en la consola cualquier error de la solicitud
        });
}
