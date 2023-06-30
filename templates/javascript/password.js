// Seleccionar el botón de tipo "submit" y agregar un evento de clic
document.querySelector("button[type='submit']").addEventListener("click", function (e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado del formulario

    // Mostrar una alerta usando la biblioteca SweetAlert
    Swal.fire({
        icon: 'success', // Icono de éxito
        title: '¡Hecho!', // Título de la alerta
        text: 'Pronto llegará un correo para restablecer tu contraseña', // Texto de la alerta
        confirmButtonText: 'Ok' // Texto del botón de confirmación
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html"; // Redirigir a "index.html" cuando se confirme la alerta
        }
    });
});
