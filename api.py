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