from flask import Flask, jsonify, request,Blueprint
from database import conexion as db

team = Blueprint('team', __name__, url_prefix='/team')

@team.route('/agregar_member', methods=['POST'])
def agregar_member():
    data = request.get_json(force=True) if request.is_json else request.form
    #id = data.get('id')
    nombre = data.get('nombre')
    apellido = data.get('apellido')
    role = data.get('role')
    description = data.get('description')
    imgurl = data.get('imgurl')
    twitter = data.get('twitter')
    linkedin = data.get('linkedin')
    github = data.get('github')
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'INSERT INTO team (nombre,apellido,role,description,imgurl,twitter, linkedin, github) values (%s,%s,%s,%s,%s,%s,%s,%s)'
                valores = (nombre, apellido, role, description, imgurl, twitter, linkedin, github)
                cursor.execute(sentencia, valores)

                return jsonify({"success": "Miembro del equipo agregado correctamente."})
    except Exception as e:
        print(f'Ocurrió un error al cargar los datos: {e}')
        return jsonify({"error": str(e)})

@team.route('/listar_team')
def listar_team():
    insertObject = []
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'SELECT * FROM team'
                cursor.execute(sentencia)
                myresult = cursor.fetchall()

                columNames = [column[0] for column in cursor.description]
                for record in myresult:
                    insertObject.append(dict(zip(columNames, record)))

                return jsonify(insertObject)
    except Exception as e:
        print(f'Ocurrió un error: {e}')
        return jsonify({"error": str(e)})