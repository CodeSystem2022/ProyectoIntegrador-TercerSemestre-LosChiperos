import psycopg2 as bd
# Conexion a la base de datos usando psycopg2
conexion = bd.connect(
    user= 'postgres',
    password = "metallica",
    host='127.0.0.1',
    port='5432',
    database = 'vacunatorio'
)
