
import{
  AsyncStorage,
  Alert
} from 'react-native';
import React, { Component } from 'react';

const LenguajeData = {
	//Errores usuarios
	ErrorEmail:["Introduzca un correo.", "Enter an email."],
	ErrorUsuarioExiste:["Este correo ya se encuentra registrado", "This email already exist"],
	ErrorEmailValido:["Introduzca un correo válido.", "Enter a valid email."],
	ErrorPasword:["Introduzca su contraseña.", "Enter your password."],
	ErrorEstatus:["Debe seleccionar un estatus.","You must select a status."],
	ErrorRol:["Debe seleccionar un rol.", "You must select a role."],
	ErrorPaswordValida:["La contraseña debe incluir minimo 8 caracteres, una mayúscula, un número y un caracter especial.", "The password must include a minimum of 8 characters, uppercase, a number and a special character."],
	ErrorCreditCard:["Datos inválidos.", "Invalid data"],

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
	BotonReenviar:["Reenviar", "Resend"],
	BotonIniciarSesion:["Iniciar Sesión", "Login"],

	
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
	ErrorMensajeLabel:["Debe ingresar una etiqueta para el boton.", "You must enter a label for the boton."],
	ErrorUrl:["Por favor escriba una url por ejemplo: www.lars.com.co", "Please write url for example: www.lars.com.co "],
	ErrorFile:["Debe seleccionar una imagen", "You must select an image"],


	//Notificaciones
	RegistrarNotificacion:["Registrar Notificacion", "Register Notification"],
	Receptores:["Receptores", "Listeners"],
	Añadidos:["Añadidos", "Added"],
	CreateTitulo:["Titulo", "Title"],
	CreateMensaje:["Mensaje", "Message"],
	CreateImagen:["Imagen", "Image"],
	BotonConf:["Configuracion Botón", "Button Configuration"],
	VisitUrl:["Visite la URL", "Visit URL"],
	AddPhoto:["Agregar imagen", "Add a picture"],
	ImagenExpandible:["Imagen Expandible", "Expandible Image"],


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
	CrearNotificacion:["Crear notificación", "Create notification"],

	//App
	//Login
	Bienvenido:["Bienvenido a Notificator", "Welcome to Notificator"],
	NoTienesCuenta:["¿No tienes cuenta?", "You do not have an account?"],
	Registrate:["Registrate ahora", "Register now"],
	ButtonRegistro:["Registrate", "Register"],
	CrearGrupo:["Crear Grupo", "Create Group"],
	EditarGrupo:["Editar Grupo", "Edit Group"],
	NombreGrupo:["Nombre del grupo", "Name the group"],
	Suscriptores:["Suscriptores", "Subscribers"],
	ErrorName:["Debe seleccionar un nombre.", "You must select a name."],
	Miembros:["Miembros", "Members"],
	ButtonCrear:["Crear", "Create"],
	EditarMiembros:["Editar Miembros", "Edit Members"],
	Grupos:["Grupos", "Groups"],
	EditarPerfil:["Editar Perfil", "Edit Profile"],
	TotalSuscriptores:["Total de Suscriptores: ", "Total Subscribers:"],
	MsjPremiumGrupos:["Necesitas hacerte premium para crear grupos", "You need to make premium to create groups."],
	Recientes:["RECIENTES", "RECENT"],
	Todos:["TODOS", "ALL"],
	GruposM:["GRUPOS", "GROUPS"],
	TusSuscriptores:["Tus suscriptores", "Your subscribers"],
	MsjUnete:["Unete a Notificator", "Join Notificator"],
	MsjAnimate:["Te invito a recibir notificaciones de", "I invite you to receive notifications of"],
	MsjCopiado:["¡Copiado al portapapeles con éxito!", "Copied to the clipboard successfully!"],
	OpcionMas:["Mas", "More"],
	MsjNotificacionPremium:["Necesitas hacerte premium para programar notificaciones", "You need to make premium to schedule notifications"],
	AgregaSuscriptores:["Agrega suscriptores", "Add subscribers"],
	NuevaNotificacion:["Nueva Notificación", "New Notification"],
	BotonNotificacion:["Nueva notificación de botón", "New button notification"],
	AgregarHorario:["Agregar Horario", "Add Schedule"],
	Receptores:["Receptores", "Receptors"],
	HoraSeleccionada:["Hora y fecha seleccionada:", "Selected time and date:"],
	SimpleNotificacion:["Nueva notificación simple", "New Single Notification"],
	MsjSimpleNotificacion:["Con este tipo de notificación podrás enviar notificaciones simples ", "With this type of notification you can send simple notifications "],
	MsjSimpleNotificacion2:["que seran vistas por tus receptores en la barra de tareas.", "which will be seen by your receivers in the taskbar."],
	ExpandibleNotificacion:["Nueva Notificación Expandible", "New Expandible Notification"],
	MsjExpandible:["Con este tipo de notificación podras añadir fotos", "With this type of notification you can add photos"],
	MsjExpandible2:["a las notificaciones que enviaras a tus receptores.", "to the notifications that you will send to your receptors."],
	WhatsappNotification:["Nueva Notificación de Whatsapp", "New Notification Whatsapp"],
	MsjWhatsappNotification:["Con este tipo de notificación tus receptores ", "With this type of notification your receptors."],
	MsjWhatsappNotification2:["podrán acceder a un chat contigo directo desde Whatsapp", "can chat with you from Whatsapp."],
	MsjBoton:["Con este tipo de notificación el receptor tendrá la opción", "With this type of notification the recipient will have the option"],
	MsjBoton2:["de aceptar o ignorar la notificación a partir de un boton.", "to accept or ignore the notification from a button."],
	MsjreenviarPremium:["Necesitas hacerte premium para reenviar notificaciones", "You need to make yourself a premium to forward notifications"],
	MsjNotiEnviada:["Notificación enviada.", "Notification sent"],
	TusNotificaciones:["Tus Notificaciones", "Your notifications"],
	MsjPremium:["HAZTE PREMIUM", "GET PREMIUM"],
	MsjPrecio:["15$ al mes", "$ 15 per month"],
	MsjP1:["Podrás crear grupos", "You can create groups"],
	MsjP2:["Reenviar notificaciones", "Resend notifications"],
	MsjP3:["¡Y muchas mas funciones!", "And more!"],
	ErrNombreTarjeta:["Introduzca el nombre del titular de la tarjeta", "Enter the name of the cardholder"],
	ErrTCredit:["Introduzca el tipo de tarjeta", "Enter the type of card"],
	ErrCountry:["Introduzca un pais", "Enter a country"],
	ErrCodigo:["Introduzca el codigo de seguridad", "Enter the security code"], 
	ErrNumTarjeta:["Introduzca el numero de tarjeta", "Enter the card number"],
	ErrFormato:["Formato invalido", "Invalid format"],
	ErrFechaVencimiento:["Introduzca la fecha de vencimiento de su tarjeta de credito", "Enter the expiration date of your credit card"],
	IngresaDatos:["Ingresa tus datos", "Enter your data"],
	DatoPago:["Datos de pago", "Payment information"],
	NumeroTarjeta:["Número de la tarjeta *", "Card number"],
	FechaVencimiento:["Fecha de vencimiento", "Expiration date"],
	CodigoSeguridad:["Código de Seguridad*", "Security code*"],
	NombreTarjeta:["Nombre del titular de la tarjeta", "Cardholder Name"],
	TarjetaCredito:["Tarjeta de Crédito", "Credit card"],
	TarjetasCredito:["Tarjetas de Crédito", "Credit Cards"],
	BotonConfirmar:["Confirmar", "Confirm"],
	MsjConfirm:["¿Desea enviar o guardar la notificación: ", "Do you want to send or save the notification:"],
	MsjConfirmar:["¿Desea guardar los cambios?", "Do you want save the changes?"],
	MsjOpcionEnviar:["Con la opción enviar usted podrá enviar y guardar su notificación.", "With the option you can send it and save your notification."],
	MsjOpcionGuardar:["Con la opción guardar usted podrá guardar su notificación para ser enviada en el momento que usted lo desee.", "With the save option you can save your notification to be sent whenever you want."],
	MsjIntroduceNombre:["Tu nombre o el nombre de tu compañia", "Your name or name of your company"],
	MsjCambiaContraseña:["CAMBIAR CONTRASEÑA", "CHANGE PASSWORD"],
	NuevaContraseña:["Nueva contraseña", "New Password"],
	MsjNuevaContraseña:["Introduce tu nueva contraseña aqui", "Enter your new password here"],
	ConfirmarContraseña:["Confirmar contraseña", "Confirm password"],
	MsjConfirmarContraseña:["Introduce nuevamente tu contraseña", "Enter again your password"],
	ErrContraseñasC:["Las contraseñas no coinciden", "Passwords do not match"],
	Preferencias:["Preferencias", "Preferences"],
	CreaReceptores:["¡Invita nuevos receptores!", "Invites new receptors!"],
	CreaNotificaciones:["¡Crea nuevas notificaciones!", "Create new notifications!"],
	CreaGrupos:["¡Crea nuevos grupos!", "Create new groups!"],
	Linktitle:["Titulo del link", "Title link"],
	Linktext:["Texto del link", "Text link"],
	BotonAñadirTarjeta:["Añadir tarjeta", "Add card"],
	Mes:["Mes", "Mounth"],
	Meses:["Meses", "Mounths"],
	Año:["Año", "Year"],
	PorMes:["por/mes", "per/month"],
	QuieroPremium:["Quiero ser premium", "I want premium"],
	AddPhotoPerfil:["Cambiar logo", "Change logo"],
	AddPhotoNotification:["Cambiar icono", "Change icon"],
	BotonConsiguelo:["¡CONSIGUELO!", "GO IT!"],
	IngresaNombre:["Tu nombre o el de tu compañia", "Enter your name or your company name"],
	USUARIO:["USUARIO", "USER"],
	NOTIFICACIONES:["NOTIFICACIONES", "NOTIFICATIONS"],
	IMAGENES:["IMAGENES", "IMAGES"],
	TARJETACREDITO:["TARJETAS DE CREDITO", "CREDIT CARDS"],
	Plantilla:["Seleccione una plantilla","Select Template"],
	UnMes:["1 Mes por $25 USD", "1 Mounth per $25 USD"],
	TresMes:["3 Meses: $22 USD por mes", "3 Mounths: $22 USD per month"],
	SeisMes:["6 Meses: $17 USD por mes", "6 Mounths: $17 USD per month"],
	UnAño:["1 Año: $12 USD por mes", "1 Year: $17 USD per month"],
	ImagenAñadida:["¡La imagen ha sido añadida con éxito!", "The picture has been added successfully!"],
	SuscriptoresRecibidos:["Vistos", "Viewed"],
	Visto:["Nadie ha visto tu notificación", "No one has seen your notification"],
	MsjAbrioNotificacion:["Abrio la notificacion", "Notification opened"],
	MsjLlegoNotificacion:["Llego la notificación", "The notification came"],
	MsjRechazoNotificacion:["Rechazo la notificación", "Rejected the notification"],
	MsjSeleccionaTarjeta:["Selecciona una tarjeta de crédito", "Select one credit card"],
	MsjNoTarjeta:["No tienes tarjetas de crédito.", "You do not have credit cards."],
	MsjTelefono:["Introduce el número donde chatearas con tus receptores", "Enter the number phone with your suscribers chat with you"],
	MsjBotonWhatsapp:["Mensaje en el Boton", "Message in the boton"],
	MsjGuardarDatos:["Los datos han sido guardados exitosamente", "The data has been saved successfully" ],
	LinkNotification:["Link Notificación", "Link Notification"],
	labelButton:["Etiqueta del Botón", "Label Button"],
	Vistas:["Vistas", "Vieweds"],
	NoVistas:["No vistas", "Did not view"],
	Rechazadas:["Rechazadas", "Rejected"],
	MsjNumeroExcedido:["Solo te quedan ", "ingles"],
	MsjNumeroExcedido2:["notificaciones", "notifications"],

}
let LanguageChoice;
AsyncStorage.getItem('UserLanguaje')
	.then((data)=>{LanguageChoice=data;})
	.catch((errr)=>Alert.alert("nno", JSON.stringify(errr)));
const Lenguaje = (msg) => {
	
	const index = (LanguageChoice ? (LanguageChoice =="English"? 1:0): 0)

	if (LenguajeData[msg])
		return LenguajeData[msg][index]
	else
		console.log(msg)

}

export default Lenguaje;

const ChangeLenguaje=(state, Do) =>{
	AsyncStorage.setItem('UserLanguaje', (state?"English":"Spanish"))
		.then((data)=>{Do();LanguageChoice=(state?"English":"Spanish")})
		.catch((errr)=>Alert.alert("nno", JSON.stringify(errr)));

}
export {ChangeLenguaje, LanguageChoice};