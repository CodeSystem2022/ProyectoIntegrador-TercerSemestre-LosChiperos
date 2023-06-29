from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from database import conexion as db
from teamController import team

app = Flask(__name__)
app.register_blueprint(team)
CORS(app, resources={r"/*": {"origins": ["https://app.vacunarg.site"]}})

@app.route('/')
def home():
    insertObject = []
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'SELECT * FROM paciente'
                cursor.execute(sentencia)
                myresult = cursor.fetchall()

                columNames = [column[0] for column in cursor.description]
                for record in myresult:
                    insertObject.append(dict(zip(columNames, record)))

                return jsonify(insertObject)
    except Exception as e:
        print(f'Ocurrió un error: {e}')
        return jsonify({"error": str(e)})

@app.route('/agregar_paciente', methods=['POST'])
def agregar_paciente():
    data = request.get_json(force=True) if request.is_json else request.form

    nombre = data.get('nombre')
    apellido = data.get('apellido')
    cuil = data.get('cuil')
    fecha_nacimiento = data.get('fecha_nacimiento')
    dosis = data.get('dosis')
    fecha_aplicacion = data.get('fecha_aplicacion')
    centro_salud = data.get('centro_salud')
    nombre_vacuna = data.get('nombre_vacuna')
    lote_vacuna = data.get('lote_vacuna')
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'INSERT INTO paciente (id,nombre,apellido,cuil,fecha_nacimiento,dosis,fecha_aplicacion, centro_salud, nombre_vacuna, lote_vacuna) values (%s,%s,%s,%s,%s,%s,%s,%s,%s)'
                valores = (nombre, apellido, cuil, fecha_nacimiento, dosis, fecha_aplicacion, centro_salud, nombre_vacuna, lote_vacuna)
                cursor.execute(sentencia, valores)

                return jsonify({"success": "Paciente agregado correctamente."})
    except Exception as e:
        print(f'Ocurrió un error al cargar los datos: {e}')
        return jsonify({"error": str(e)})

@app.route('/borrar_paciente/<int:id>', methods=['DELETE'])
def borrar_paciente(id):
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'DELETE FROM paciente WHERE id_paciente = %s'
                cursor.execute(sentencia, (id,))

                return jsonify({"success": "Paciente eliminado correctamente."})
    except Exception as e:
        print(f'No se pudo borrar el paciente: {e}')
        return jsonify({"error": str(e)})

@app.route('/editar_paciente/<int:id>', methods=['PUT'])
def editar_paciente(id):
    data = request.get_json(force=True) if request.is_json else request.form

    try:
        with db:
            with db.cursor() as cursor:
                for key in data:
                    sentencia = f'UPDATE paciente SET {key} = %s WHERE id_paciente = %s'
                    valores = (data[key], id)
                    cursor.execute(sentencia, valores)
                return jsonify({"success": "Paciente actualizado correctamente."})
    except Exception as e:
        print(f'No se pudo modificar los valores: {e}')
        return jsonify({"error": str(e)})

@app.route('/buscar_paciente', methods=['POST'])
def buscar_paciente():
    data = request.get_json(force=True) if request.is_json else request.form
    cuil = data.get('cuil')
    insertObject = []
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'SELECT * FROM paciente WHERE cuil = %s'
                cursor.execute(sentencia, (cuil,))
                myresult = cursor.fetchall()

                columNames = [column[0] for column in cursor.description]
                for record in myresult:
                    insertObject.append(dict(zip(columNames, record)))

                return jsonify(insertObject)
    except Exception as e:
        print(f'Ocurrió un error: {e}')
        return jsonify({"error": str(e)})


if __name__ == '__main__':

    app.run(host='0.0.0.0', debug=True, port=5000)
