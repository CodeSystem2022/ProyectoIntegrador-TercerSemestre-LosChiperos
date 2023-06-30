function login(event) {
    event.preventDefault(); // prevent form from submitting
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    fetch('https://api.reciclarg.cloud/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: '¡Hecho!',
            text: 'Bienvenido: ' + username,
            confirmButtonText: 'Ok'
          }).then((result) => {
            // redirige a index2.html cuando el usuario hace clic en "OK"
            if (result.isConfirmed) {
              window.location.href = '/index2.html';
            }
          })
        } else {
          console.error('Error:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }