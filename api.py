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
