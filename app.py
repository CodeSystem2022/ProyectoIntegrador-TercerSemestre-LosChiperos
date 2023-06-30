from flask import Flask
from api import home, agregar_paciente, borrar_paciente, editar_paciente, listar_equipo, agregar_integrante_equipo, login

app = Flask(__name__)

# Ruta para la página de inicio
app.route('/')


# Ruta para agregar un paciente (POST)
app.route('/agregar_paciente', methods=['POST'])


# Ruta para borrar un paciente (DELETE)
app.route('/borrar_paciente/<int:id>', methods=['DELETE'])


# Ruta para editar un paciente (PUT)
app.route('/editar_paciente/<int:id>', methods=['PUT'])


# Ruta para listar el equipo (GET)
app.route('/listar_equipo', methods=['GET'])


# Ruta para agregar un integrante al equipo (POST)
app.route('/agregar_integrante_equipo', methods=['POST'])


# Ruta para el inicio de sesión (POST)
app.route('/login', methods=['POST'])