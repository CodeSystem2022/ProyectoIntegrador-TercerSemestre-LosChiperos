from flask import  render_template, request, redirect, url_for
from database import conexion as db

def agregar_paciente():
    nombre = request.form["nombre"]
    segundo_nombre = request.form["segundo_nombre"]
    apellido = request.form["apellido"]
    nro_dni = request.form["nro_dni"]
    fecha_nacimiento = request.form["fecha_nacimiento"]
    dosis = request.form["dosis"]
    fecha_aplicacion = request.form["fecha_aplicacion"]
    centro_salud = request.form["fecha_aplicacion"]
    centro_salud = request.form["centro_salud"]
    nombre_vacuna = request.form["nombre_vacuna"]
    lote_vacuna = request.form["lotr_vacuna"]
    try:
        with db:
            with db.crusor() as cursor:
                sentencia = 'INSER INTO paciente (nombre, segundo_nombre, apellido,nro_dni, fecha_nacimiento, dosis, fecha_aplicacion, centro_salud, nombre_vacuna, lote_vacuna)'
                valores = (nombre, segundo_nombre, apellido,nro_dni, fecha_nacimiento, dosis, fecha_aplicacion, centro_salud, nombre_vacuna, lote_vacuna)
                cursor.execute(sentencia,valores)

    except Exception as e:
        print(f'Ocurrió un erro al cargar los datos:{e}')
    finally:
        cursor.close()
        return redirect(url_for('home'))       

def editar_paciente(id):
    nombre = request.form['nombre']
    segundo_nombre = request.form['segundo_nombre']
    apellido = request.form['apellido']
    nro_dni = request.form['nro_dni']
    fecha_nacimiento = request.form['fecha_nacimiento']
    dosis = request.form['dosis']
    centro_salud = request.form['centro_salud']

def borrar_paciente(id):
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = "DELETE FROM pacientes WHERE id = %s;"
                cursor.execute(sentencia, (id,))
    except Exception as e:
        print('Error al borrar el paciente:  {e}')
    finally:
        cursor.close()
        return redirect(url_for('home'))
from flask import render_template, redirect, request, url_for
from database import conexion as database


def home ():
    insertObject =  []
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = "SELECT * FROM paciente"
                cursor.execute(sentencia)
                myresult = cursor.fetchall()

                columName = [column[0] for column in cursor.description]
                for record in myresult:
                    insertObject.append(dict(zip(columName, record)))
    except Exception as e:
        print(f"Ocurrio un error: {e}")
    finally:
        cursor.close()
        return render_template("index.html", data=insertObject)
