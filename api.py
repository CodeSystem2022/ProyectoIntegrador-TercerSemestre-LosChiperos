from database import conexion as db
def editar_paciente(id):
    nombre = request.form['nombre']
    segundo_nombre = request.form['segundo_nombre']
    apellido = request.form['apellido']
    nro_dni = request.form['nro_dni']
    fecha_nacimiento = request.form['fecha_nacimiento']
    dosis = request.form['dosis']
    centro_salud = request.form['centro_salud']
    
    try:
        with db:
            with db.cursor() as cursor:
                sentencia = 'UPDATE paciente SET nombre=%s, segundo_nombre = %s, apellido=%s,nro_dni=%s, fecha_nacimiento=%s, dosis=%s, centro_salud=%s WHERE id_paciente=%s'
                valores = (nombre, segundo_nombre, apellido,nro_dni,fecha_nacimiento,dosis,
                        centro_salud, id)
                cursor.execute(sentencia, valores)
    except Exception as e:
        print(f'No se pudo modificar los valores: {e}')
    finally:
        cursor.close()
        return redirect(url_for('home'))