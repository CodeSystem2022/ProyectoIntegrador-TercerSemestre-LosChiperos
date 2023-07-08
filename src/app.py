from flask import Flask
from api import home, agregar_paciente, borrar_paciente, editar_paciente
from teamController import listar_equipo, agregar_integrante_equipo
import os
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from login import login
from database import conexion as db

template_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
template_dir = os.path.join(template_dir, 'src', 'templates')

app = Flask(__name__, template_folder=template_dir)

app.secret_key = 'clave_secreta'  
app.config['JWT_SECRET_KEY'] = 'clave_secreta_jwt'
jwt = JWTManager(app)


# Ruta para la página de inicio
app.route('/')(home)


# Ruta para agregar un paciente (POST)
app.route('/agregar_paciente', methods=['POST'])(agregar_paciente)


# Ruta para borrar un paciente (DELETE)
app.route('/borrar_paciente/<int:id>', methods=['DELETE'])(borrar_paciente)


# Ruta para editar un paciente (PUT)
app.route('/editar_paciente/<int:id>', methods=['PUT'])(editar_paciente)


# Ruta para listar el equipo (GET)
app.route('/listar_equipo', methods=['GET'])(listar_equipo)


# Ruta para agregar un integrante al equipo (POST)
app.route('/agregar_integrante_equipo', methods=['POST'])(agregar_integrante_equipo)


# Ruta para el inicio de sesión (POST)
app.route('/login', methods=['POST'])(login)

if __name__ == '__main__':
    app.run(debug=True, port=5000)