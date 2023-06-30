import psycopg2 as bd

# Conexion a la base de datos usando psycopg2
conexion = bd.connect(
    usuario= 'postgres',
    password= 'metallida',
    host= 'base-vacunarg.postgres.database.azure.com',
    port= '5432'
    database= 'vacunatorio'

)