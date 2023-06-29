#home
app.route('/')(home)

#agregar paciente
app.route('/agregar_paciente',methods=['POST'])(agregar_paciente)

#borrar paciente
app.route('/borrar_paciente/<int:id>',methods=['DELETE'])(borrar_paciente)

#editar paciente
app.route('/editar_paciente/<int:id>',methods=['PUT'])(editar_paciente)

#listar equipo
app.route('/listar_equipo',methods=['GET'])(listar_equipo)

#agregar integrante equipo
app.route('/agregar_integrante_equipo',methods=['POST'])(agregar_integrante_equipo)

#login
app.route('/login',methods=['POST'])(login)