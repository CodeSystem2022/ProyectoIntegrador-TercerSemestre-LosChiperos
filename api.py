def agregar_paciente():
     nombre = request.form["nombre"]
     segundo_nombre = request.form["segundo_nombre"]
     apellido = request.form["apellido"]
     nro_dni = request.form["nro_dni"]
     fecha_nacimiento = request.form["fecha_nacimiento"]
     dosis = request.form["dosis"]
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
