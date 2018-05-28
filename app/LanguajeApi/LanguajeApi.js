
import{
  AsyncStorage,
} from 'react-native';
import React, { Component } from 'react';

const LenguajeData = {
	//Errores usuarios
	ErrorEmail:["Introduzca un correo.", "Enter an email."],
	ErrorEmailValido:["Introduzca un correo válido.", "Enter a valid email."],
	ErrorPasword:["Introduzca su contraseña.", "Enter your password."],
	ErrorEstatus:["Debe seleccionar un estatus.","You must select a status."],
	ErrorRol:["Debe seleccionar un rol.", "You must select a role."],

	//Registro de usuarios
	RegistrarUsuario:["Registrar Usuario", "Register User"],
	NumeroTlf:["Número de teléfono", "Phone number"],
	OpcionSelecciona:["Selecciona", "Select"],
	OpcionActivo:["Activo", "Active"],
	OpcionInactivo:["Inactivo", "Inactive"],
	OpcionSuspendido:["Suspendido", "Suspended"],
	CreateName:["Nombre", "Name"],
	CreateEmail:["Correo eléctronico", "Email address"],
	CreatePassword:["Contraseña", "Password"],
	CreateType:["Tipo de usuario", "Type of user"],
	CreateRol:["Rol", "Role"],
	OpcionPremium:["Usuario Premium", "User Premium"],
	OpcionNoPremium:["Usuario no Premium", "User not Premium"],
	OpcionAdministrador:["Administrador", "Administrator"],
	CreateCompañia:["Compañia", "Company"],
	CreateCiudad:["Ciudad", "City"],
	CreateCodigoArea:["Código de Área", "Area code"],
	CreatePais:["País", "Country"],
	CreateLanguaje:["Lenguaje", "Language"],
	BotonRegresar:["Regresar", "Return"],
	BotonCancelar:["Cancelar", "Cancel"],
	EditarUsuario:["Editar Usuario", "Edit User"],
	BotonGuardar:["Guardar", "Save"],

	//Tablas
	FechaRegistro:["Fecha de Registro", "Registration Date"],
	Estatus:["Estatus", "Status"],
	Perfil:["Perfil", "Profile"],
	
	//Botones
	BotonEditar:["Editar", "Edit"],
	BotonEliminar:["Eliminar", "Delete"],
	VerPerfil:["Ver perfil", "View profile"],
	BotonAnterior:["Ant", "Prev"],
	BotonSiguiente:["Sig", "Next"],
	BotonRegistrar:["Registrar", "Register"],
	BotonAgregar:["Agregar", "Add"],
	BotonEnviar:["Enviar", "Send"],
	
	//Mensajes:
	MsjEliminarUsuario:["¿Desea eliminar el usuario", "Do you want to delete the user"],
	MsjEliminarReceptor:["¿Desea eliminar el receptor", "Do you want to delete the listener"],
	MsjnohayReceptores:["No hay receptores", "There are no listeners."],
	MsjEnviarNotificaciones:["¿Desea enviar la notificacion desde el usuario", "Do you want to send the notification from the user"],
	Msjhaciareceptores:["hacia los receptores", "to the listeners"],
	MsjEliminarNotificacion:["¿Desea eliminar la notificacion de el usuario", "Do you want to delete the user's notification"],


	//Errores Listener
	ErrorSO:["Debe seleccionar un sistema operativo.", "You must select an operating system."],
	ErrorToken:["Debe introducir un token.", "You must enter a token."],
	ErrorEndPoint:["Debe introducir un Endpoint.", "You must enter an Endpoint"],
	ErroAuth:["Debe introducir un Auth.", "You must enter an Auth."],
	ErrorP256h:["Debe introducir un P256h.", "You must enter an P256h"],
	ErrorPhoneNumber:["Debe introducir un número de telefono.", "You must enter a phone number."],
	ErrorUsuario:["Debe seleccionar un Usuario.", "You must select a User."],

	//Listener
	RegistrarReceptor:["Registrar Receptor", "Register Listener"],
	EditarReceptor:["Editar Receptor", "Edit Listener"],
	CreateGenero:["Género", "Gender"],
	SexoFemenino:["Femenino", "Female"],
	SexoMasculino:["Masculino", "Male"],
	CreateEdad:["Edad", "Age"],
	Usuario:["Usuario", "User"],
	SistemaOperativo:["Sistema Operativo", "OS"],
	DispositivoAndroid:["Dispositivo Android", "Android Device"],
	DispositivoApple:["Dispositivo Apple", "Apple Device"],
	Navegador:["Navegador", "Browser"],
	Acepto:["Acepto", "Acepted"],

	//Errores Notificaciones
	ErrorReceptor:["Debe seleccionar un receptor.", "You must select a Listener."],
	ErrorTitulo:["La notificación debe tener un titulo.", "The notification must have a title."],
	ErrorMensaje:["La notificación debe tener un mensaje.", "The notification must have a message."], 

	//Notificaciones
	RegistrarNotificacion:["Registrar Notificacion", "Register Notification"],
	Receptores:["Receptores", "Listeners"],
	Añadidos:["Añadidos", "Added"],
	CreateTitulo:["Titulo", "Title"],
	CreateMensaje:["Mensaje", "Message"],
	CreateImagen:["Imagen", "Image"],

	//Dashboard
	UsuariosActivos:["Usuarios Activos", "Active users"],
	UsuariosInactivos:["Usuarios Inactivos", "Inactive Users"],
	UsuariosSuspendidos:["Usuarios Suspendidos","Suspended Users"],
	ReceptoresRegistrados:["Receptores Registrados", "Registered Listeners"],
	NotificacionesEnviadas:["Notificaciones Enviadas", "Notifications Sent"],

	//Header
	Lenguaje:["Lenguaje", "Language"],
	Español:["Español", "Spanish"],
	Ingles:["Inglés", "English"],
	Telefono:["Teléfono", "Phone"],
	Configuracion:["Configuración", "Settings"],
	CerrarSesion:["Cerrar Sesión", "Logout"],
	Cuenta:["Cuenta", "Account"],

	//Aside
	UltimosUsuarios:["Últimos Usuarios", "Last Users"],
	UltimosReceptores:["Últimos Receptores", "Last Listeners"],
	UltimasNotificaciones:["Últimas Notificaciones", "Last Notifications"],
	PermitirReenvios:["Permitir Reenvíos", "Allow Resets"],
	MsjPermitirReenvios:["Permitir reenvíos de notificaciones para usuarios no premium", "Allow notifications forwarding for non-premium users"],
	PermitirNotificaciones:["Permitir programar notificaciones", "Allow notifications to be scheduled"],
	MsjPermitirNotificaciones:["Permitir el uso de notificaciones programadas", "Allow the use of scheduled notifications"],
	LogoPersonalizable:["Logo Personalizable", "Customizable logo"],
	MjsLogoPersonalizable:["Permite el uso de logo de la compañia del usuario no premium", "Allows the use of the non-premium user's company logo"],
	CrearGrupos:["Crear Grupos", "Create Groups"],
	MsjCrearGrupos:["Permitir crear grupos a usuarios no premium", "Allow creating groups to non-premium users"],
	PermitirImagenes:["Permitir imagen en la notificación", "Allow image in the notification"],
	MsjPermitirImagenes:["Permitir que la notificacion contenga imágenes para usuarios no premium", "Allow the notification to contain images for non-premium users"],
	PermitirTipoNotificacion:["Permitir tipos de notificación", "Allow notification types"],
	MsjPermitirTipoNotificacion:["Permitir que usuarios no premium puedan enviar distintos tipos de notificación.", "Allow non-premium users to send different types of notification."],

	//Sidebar
	Usuarios:["Usuarios", "Users"],
	TodosUsuarios:["Todos los usuarios", "All users"],
	CrearUsuario:["Crear usuario", "Create user"],
	Inactivos:["Inactivos", "Inactive"],
	Activos:["Activos", "Active"],
	Suspendidos:["Suspendidos", "Suspended"],
	TodosReceptores:["Todos los receptores", "All Listeners"],
	CrearReceptor:["Crear receptor", "Create listener"],
	Notificaciones:["Notificaciones", "Notifications"],
	TodasNotificaciones:["Todas", "All notifications"],
	CrearNotificacion:["Crear notificación", "Create notification"]
}
let LanguageChoice;
AsyncStorage.getItem('UserLanguaje')
	.then((data)=>{LanguageChoice=data;})
	.catch((errr)=>Alert.alert("nno", JSON.stringify(errr)));
const Lenguaje = (msg) => {

	const index = (LanguageChoice ? (LanguageChoice =="English"? 1:0): 0)

	if (LenguajeData[msg])
		return LenguajeData[msg][0]
	else
		console.log(msg)

}

export default Lenguaje;