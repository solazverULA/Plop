

import cookie from "react-cookies";
import React, { Component } from 'react';

const data = {

	MensajeBoton:["Mensaje del boton", "Button message"],
	ErrorEmail:["Introduzca un correo.", "Enter an email."],
	ErrorEmailValido:["Introduzca un correo válido.", "Enter a valid email."],
	ErrorPasword:["Introduzca su contraseña.", "Enter your password."],
	ErrorPaswordValido:["Contraseña muy corta.", "Very short password"],
	ErrorEstatus:["Debe seleccionar un estatus.","You must select a status."],
	ErrorRol:["Debe seleccionar un rol.", "You must select a role."],
	ErrorCode:["Debe ingresar un código", "Enter your code"],
	ErrorPorcentaje:["Debe ingresar un porcentaje de ganancia", "You must enter a percentage of profit"],
	ErrorPorcentaje2:["Formato no válido", "Format not valid"],
	ErrName:["Introduzca un Nombre", "Enter a name."],
	ErrDate:["Introduzca una Fecha", "Enter a Date."],
	ErrrCheckBox:["Acepte nuestros terminos y servicios", "Accept our term and services."],
	Mes:["Mes", "Mounth"],
	Meses:["Meses", "Mounths"],
	Año:["Año", "Year"],
	PorMes:["por/mes", "per/month"],

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
	CreateCodeReseller:["Código", "Code"],
	OpcionPremium:["Usuario Premium", "User Premium"],
	OpcionNoPremium:["Usuario no Premium", "User not Premium"],
	OpcionComerciante:["Comerciante", "Merchant"],
	OpcionAdministrador:["Administrador", "Administrator"],
	OpcionReseller:["Revendedor", "Reseller"],
	OpcionEmpresa:["Empresa", "Business"],
	CreateCompañia:["Compañia", "Company"],
	CreateCiudad:["Ciudad", "City"],
	CreateCodigoArea:["Código de Área", "Area code"],
	CreatePais:["País", "Country"],
	CreateLanguaje:["Lenguaje", "Language"],
	CreatePorcentaje:["% de ganancia", "% of profit"],
	EditarUsuario:["Editar Usuario", "Edit User"],
	UltimoPago:["Último pago", "Last Payment"],
	AddPhotoProfile:["Añadir foto de perfil", "Add photo profile"],
	PlanReseller:["Plan", "Plan"],
	Filtrar:["Filtrar", "Filter"],
	PerfilEditado:["Perfil actualizado exitosamente!", "Profile successfully updated!"],

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
	BotonRegresar:["Regresar", "Return"],
	BotonCancelar:["Cancelar", "Cancel"],
	BotonGuardar:["Guardar", "Save"],
	BotonCrear:["Crear", "Create"],

	//Mensajes:
	MsjEliminarUsuario:["¿Desea eliminar el usuario", "Do you want to delete the user"],
	MsjEliminarReceptor:["¿Desea eliminar el receptor", "Do you want to delete the listener"],
	MsjnohayReceptores:["No hay receptores", "There are no listeners."],
	MsjEnviarNotificaciones:["¿Desea enviar la notificacion desde el usuario?", "Do you want to send the notification from the user"],
	Msjhaciareceptores:["hacia los receptores", "to the listeners"],
	MsjEliminarNotificacion:["¿Desea eliminar la notificacion de el usuario", "Do you want to delete the user's notification"],

	//Errores Listener
	ErrorSO:["Debe seleccionar un sistema operativo.", "You must select an operating system."],
	ErrorToken:["Debe introducir un token.", "You must enter a token."],
	ErrorEndPoint:["Debe introducir un Endpoint.", "You must enter an Endpoint"],
	ErroAuth:["Debe introducir un Auth.", "You must enter an Auth."],
	ErrorP256h:["Debe introducir un P256h.", "You must enter an P256h"],
	ErrorPhoneNumber:["Debe introducir un número de telefono.", "You must enter a phone number."],
	AceptaTerminos:["Acepta nuestros términos y servicios.", "Accept our terms and services."],
	ErrorUsuario:["Debe seleccionar un Usuario.", "You must select a User."],
	ErrorNavegador:["Parece que tu navegador no es compatible con nuestras notificaciones, descarga nuestra app desde", "It seems that your browser is not compatible with our notifications, download our app from"],

	//Listener
	RegistrarReceptor:["Registrar Receptor", "Register Listener"],
	EditarReceptor:["Editar Receptor", "Edit Listener"],
	CreateGenero:["Género", "Gender"],
	SexoFemenino:["Mujer", "Female"],
	SexoMasculino:["Hombre", "Male"],
	CreateEdad:["Edad", "Age"],
	CreateFechaNacimiento:["Fecha de nacimiento", "birthday"],
	Usuario:["Usuario", "User"],
	SistemaOperativo:["Sistema Operativo", "OS"],
	DispositivoAndroid:["Dispositivo Android", "Android Device"],
	DispositivoApple:["Dispositivo Apple", "Apple Device"],
	Navegador:["Navegador", "Browser"],
	Acepto:["Acepto", "Acepted"],
	ButtonDisable:["Deshabilitar la mensajería push", "Disable Push Messaging"],
	ButtonRegistrate:["Registrate con nosotros", "Register with us"],
	Nombre:["NOMBRE", "NAME"],
	TuNombre:["Tu Nombre", "Your Name"],
	Telefono:["NUMERO DE TELEFONO", "PHONE NUMBER"],
	MsjAqui:["aqui", "here"],
	MsjBienvenida:["Unete a nosotros para tener las mejores notificaciones siempre.", "Join us to always have the best notifications."],
	Volver:["Volver", "Go back"],
	VerMas:["Ver más", "See more"],
	Cerrar:["Cerrar", "Close"],
	Compartir:["Compartir", "Share"],

	//Errores Notificaciones
	ErrorReceptor:["Debe seleccionar un receptor.", "You must select a Listener."],
	ErrorTitulo:["La notificación debe tener un titulo.", "The notification must have a title."],
	ErrorMensaje:["La notificación debe tener un mensaje.", "The notification must have a message."],

	//Notificaciones
	RegistrarNotificacion:["Registrar Notificacion", "Register Notification"],
	EditarNotificacion:["Editar Notificacion", "Edit Notification"],
	Receptores:["Receptores", "Listeners"],
	Añadidos:["Añadidos", "Added"],
	CreateTitulo:["Titulo", "Title"],
	CreateMensaje:["Mensaje", "Message"],
	AdjuntarImagen:["Adjuntar una imagen", "Atach an image"],
	CreateImagen:["Imagen", "Image"],
	EnviaNotificaciones:["Envia notificaciones personalizadas gratis", "Send free custom push notifications"],
	IntroduceMensaje:["Introduce aqui tu mensaje", "Enter your message."],
	CrearNuevaNotificacion:["¡Crea una nueva una notificación!", "Create a new notification!"],
	Fecha:["Fecha", "Date"],

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
	PermitirEnviar:["Enviar notificaciones", "Send notifications"],
	MsjPermitirEnviar:["Defina el número de notificaciones que un usuario puede enviar", "Define the number of notifications that a user can send"],
	PermitirReenvios:["Permitir Reenvíos", "Allow Resets"],
	MsjPermitirReenvios:["Permitir reenvíos de notificaciones para usuarios no premium", "Allow notifications forwarding for non-premium users"],
	PermitirNotificaciones:["Permitir programar notificaciones", "Allow notifications to be scheduled"],
	MsjPermitirNotificaciones:["Permitir el uso de notificaciones programadas", "Allow the use of scheduled notifications"],
	LogoPersonalizable:["Logo Personalizable", "Customizable logo"],
	MjsLogoPersonalizable:["Permite el uso de logo de la compañia del usuario no premium", "Allows the use of the non-premium user's company logo"],
	MsjCrearGrupos:["Permitir crear grupos a usuarios no premium", "Allow creating groups to non-premium users"],
	PermitirImagenes:["Permitir imagen en la notificación", "Allow image in the notification"],
	MsjPermitirImagenes:["Permitir que la notificacion contenga imágenes para usuarios no premium", "Allow the notification to contain images for non-premium users"],
	PermitirTipoNotificacion:["Permitir tipos de notificación", "Allow notification types"],
	MsjPermitirTipoNotificacion:["Permitir que usuarios no premium puedan enviar distintos tipos de notificación.", "Allow non-premium users to send different types of notification."],

	//Sidebar
	Notificaciones:["Notificaciones", "Notifications"],
	Contactos:["Contactos", "Contacts"],
	Grupos:["Grupos", "Groups"],
	CompartirEnlace:["Comparte este enlace con tus clientes", "Share this link to your clients"],

	//Contactos
	InvitarReceptores:["¡Invita nuevos receptores!", "Invite new receptors!"],

	//Grupos
	CrearGrupos:["¡Crea nuevos grupos!", "Create new groups!"],
	CrearGruposModal:["Crear Grupos", "Create Groups"],

	//meses del ano
	Enero:["Enero", "Jenuary"],
	Febrero:["Febrero", "February"],
	Marzo:["Marzo", "March"],
	Abril:["Abril", "April"],
	Mayo:["Mayo", "May"],
	Junio:["Junio", "June"],
	Julio:["Julio", "July"],
	Agosto:["Agosto", "August"],
	Septiembre:["Septiembre", "September"],
	Octubre:["Octubre", "October"],
	Noviembre:["Noviembre", "November"],
	Diciembre:["Diciembre", "December"],

	//Notipoints
	Lugares:["LUGARES", "PLACES"],
	Todos:["TODOS", "ALL"],
	verMenos:["Ver menos", "See less"],
}


const lenguage = (message) => {
 	const selectedLanguage = cookie.load('language');
	const index = (selectedLanguage ? (selectedLanguage == "English" ? 1:0) : 0)

	if (data[message])
		return data[message][index]
	else
		console.log(message)

}

export default lenguage;
