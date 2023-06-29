import psycopg2 as bd

# Conexion a la base de datos usando psycopg2
conexion = bd.connect(
    usuario= 'postgres',
    password= 'metallida',
    host= '190.138.33.20',
    port= '192.168.1.0',
    database= 'vacunatorio'

)