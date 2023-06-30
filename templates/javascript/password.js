document.querySelector("button[type='submit']").addEventListener("click", function (e) {
    e.preventDefault();
    Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: 'Pronto llegará un correo para restablecer tu contraseña',
        confirmButtonText: 'Ok'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = "index.html";
        }
    })
});