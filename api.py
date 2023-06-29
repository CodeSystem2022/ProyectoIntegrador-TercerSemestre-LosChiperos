from flask iport render_template, redirect, request, url_for
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

def agregar_paciente():
    nombre = request.form["nombre"]
    segundo_nombre = request.form["segundo_nombre"]
    apellido = request.form["apellido"]
    nro_dni = request.form["nro_dni"]
    fecha_nacimiento = request.form["fecha_nacimiento"]
    dosis = request.form["dosis"]
    fecha_aplicacion = request.form["fecha_aplicacion"]
    centro_salud = request.form["centro_salud"]
    nombre_vacuna = request.form["nombre_vacuna"]
    lote_vacuna = request.form["lote_vacuna"]
