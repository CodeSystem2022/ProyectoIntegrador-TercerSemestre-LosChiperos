from flask import Flask, jsonify, request
from database import conexion as db

def agregar_integrante_equipo():
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
    

def listar_equipo(): # Definicion de la función
    insertObject = [] # Lista para almacenar los resultados de la consulta
    try:
        with db: # Establece una conexión a la base de datos
            with db.cursor() as cursor: # Crea un cursor para ejecutar consultas
                sentencia = 'SELECT * FROM team' # Consulta SQL para seleccionar todos los registros de la tabla "team"
                cursor.execute(sentencia) # Ejecuta la consulta SQL en la base de datos
                myresult = cursor.fetchall() # Obtiene todos los resultados de la consulta

                columNames = [column[0] for column in cursor.description] # Obtiene los nombres de las columnas de la tabla

                # Itera sobre los registros devueltos y crea un diccionario para cada registro
                for record in myresult:
                    insertObject.append(dict(zip(columNames, record))) # Agrega el diccionario a la lista

                return jsonify(insertObject) # Devuelve los resultados como una respuesta JSON
    except Exception as e:
        print(f'Ocurrió un error: {e}') # Imprime un mensaje de error en caso de excepción
        return jsonify({"error": str(e)}) # Devuelve un mensaje de error como respuesta JSON