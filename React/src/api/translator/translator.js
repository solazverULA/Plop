

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
	CreateImagen:["Imagen", "Image"],
	EnviaNotificaciones:["Envia notificaciones personalizadas gratis", "Send free custom push notifications"],
	IntroduceMensaje:["Introduce aqui tu mensaje", "Enter your message."],

	//Dashboard
	UsuariosActivos:["Usuarios Activos", "Active users"],
	UsuariosInactivos:["Usuarios Inactivos", "Inactive Users"],
	UsuariosSuspendidos:["Usuarios Suspendidos","Suspended Users"],
	ReceptoresRegistrados:["Receptores Registrados", "Registered Listeners"],
	NotificacionesEnviadas:["Notificaciones Enviadas", "Notifications Sent"],
	Estadisticas:["Estadísticas", "Statistics"],
	MetodoPago:["Método de Pago", "Payment Method"],

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
	CrearGrupos:["Crear Grupos", "Create Groups"],
	MsjCrearGrupos:["Permitir crear grupos a usuarios no premium", "Allow creating groups to non-premium users"],
	PermitirImagenes:["Permitir imagen en la notificación", "Allow image in the notification"],
	MsjPermitirImagenes:["Permitir que la notificacion contenga imágenes para usuarios no premium", "Allow the notification to contain images for non-premium users"],
	PermitirTipoNotificacion:["Permitir tipos de notificación", "Allow notification types"],
	MsjPermitirTipoNotificacion:["Permitir que usuarios no premium puedan enviar distintos tipos de notificación.", "Allow non-premium users to send different types of notification."],

	//Reseller Sidebar
	Inicio:["Inicio", "Dashboard"],
	MisUsuarios:["Mis usuarios", "My users"],
	Membresia:["Membresía", "Membership"],
	AyudaClientes:["Ayuda a mis clientes", "Help my customers"],
	Soporte:["Conversa con nosotros", "Chat with us"],
	Material:["Material", "Material"],

	//Reseller header
	Retiros:["Retiros", "Withdraw"],

	//Reseller Dashboard
	GananciasMensuales:["Ganancias del Mes", "Month Earnings"],
	UsuariosRegistrados:["Usuarios", "Users Registered"],
	MiBilletera:["Mi Billetera", "My Wallet"],

  	//Reseller users
  	FechaIngreso:["Fecha de ingreso", "Added date"],

  	//Reseller support
  	Grupos:["Grupos", "Groups"],
  	Contactos:["Contactos", "Contacts"],
  	Fondo:["Fondo", "Background"],
		ReceptoresDe:["Receptores de", "Listiners of"],
		NotificacionesDe:["Notificaciones de", "Notifications of"],
		TicketsDe:["Tickets de", "Tickets of"],
		LogoDe:["Cambiar logo de", "Change logo of"],
		NoSupport:["Este usuario no tiene tickets.", "This user does not have any ticket."],
		UsuarioActualizado:["Usuario actualizado con éxito.", "User updated successfully."],

  	//Reseller membership
  	CodigoReseller:["Tu codigo de revendedor", "Your reseller code"],
  	CambioCodigoReseller:["Solo puedes cambiar tu código una vez.", "You can only change your code once."],
	CodigoActualizado:["Codigo actualizado exitosamente!", "Code successfully updated!"],
	NoPuedeActualizar:["No puede editar su código nuevamente.", "You can not edit your code anymore."],

	//Reseller Edit Profile
	PerfilEditadoReseller:["Perfil actualizado exitosamente! Verá los cambios en su próximo inicio de sesión.", "Profile successfully updated! You will see the changes in your next logon."],
	EditarPerfil:["Editar perfil", "Edit profile"],

	//Reseller add account
	AgregarBanco:["Agrega tu cuenta bancaria", "Add your bank account"],
	SeleccionarBanco:["Seleccionar", "Select a bank"],
	NombreBanco:["Nombre del banco", "Bank name"],
	NumeroRuta:["Número de ruta", "Route number"],
	NumeroCuenta:["Número de cuenta", "Account number"],
	Enviar:["Enviar", "Submit"],
	Agregar:["Agregar cuenta", "Add account"],
	ErrorBanco:["Debe seleccionar un Banco", "You must select a bank"],
	ErrorRuta:["Debe ingresar un número de ruta", "You must enter a routing number"],
	ErrorCuenta:["Debe ingresar un número de cuenta", "You must enter an account number"],
	ErrorTipo:["Debe ingresar un tipo de cuenta", "You must enter an account type"],
	NoDisponible:["Esta funcionalidad se encuentra temporalmente deshabilitada.", "This function is temporarily disabled."],
	MisCuentas:["Mis cuentas bancarias", "My bank accounts"],
	TipoCuenta:["Tipo de cuenta", "Account type"],
	CuentaCorriente:["CHECKINGS", "CORRIENTE"],
	CuentaAhorro:["SAVINGS", "AHORRO"],
	ErrorRetiroCuenta:["Debe seleccionar una cuenta", "You must select an account"],
	ErrorRetiroCantidad:["Debe especificar una cantidad", "You must especify an amount"],
	EnProceso:["EN PROCESO", "IN PROCESS"],
	Pagado:["PAGADO", "PAYED"],
	Negado:["NEGADO", "DENIED"],

	//Reseller Withdraw
	SolicitarRetiro:["Solicitar retiro", "Request withdraw"],
	SeleccionarCuenta:["Seleccionar cuenta", "Select bank account"],
	Cantidad:["Cantidad", "Amount"],
	Descripcion:["Descripción (opcional)", "Description (optional)"],
	Solicitar:["Solicitar", "Request"],
	Fecha:["Fecha", "Date"],
	RetiroCuenta:["A la cuenta", "To account"],
	Estado:["Estado", "Status"],
	EstadoRetiro:["Actualizar estado", "Update status"],

	//banks
	AgregarBancoAdmin:["Agregar un nuevo banco", "Add a new bank"],

	//Reseller Material
	Pronto:["Pronto...", "Coming soon..."],

	//Sidebar
	Usuarios:["Usuarios", "Users"],
	TodosUsuarios:["Todos los usuarios", "All users"],
	CrearUsuario:["Crear nuevo usuario", "Create new user"],
	Inactivos:["Inactivos", "Inactive"],
	Activos:["Activos", "Active"],
	Suspendidos:["Suspendidos", "Suspended"],
	TodosReceptores:["Todos los receptores", "All Listeners"],
	CrearReceptor:["Crear receptor", "Create listener"],
	Notificaciones:["Notificaciones", "Notifications"],
	TodasNotificaciones:["Todas", "All notifications"],
	CrearNotificacion:["Crear notificación", "Create notification"],
	Config:["Configuración", "Configuration"],
	Numerodenotificaciones:["Nº de notificaciones", "Nº notifications"],
	RetirosAdmin:["Administrar retiros", "Manage withdraws"],
	Bancos:["Bancos", "Banks"],

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

	//Business new user
	ConfiguracionSistema:["Configuración del sistema", "System configuration"],
	UsuarioRegistrado:["Usuario registrado con éxito.", "User registered successfully."],
	NombreCompleto:["Nombre completo", "Full name"],
	EmailPlaceholder:["alguien@ejemplo.com", "someone@example.com"],
	EscribeLoQueQuieras:["Escribe lo que quieras", "Write whatever you want"],
	ParrafoNewUser:["Puedes darle un nombre al perfil de este usuario que esté acorde con los perfiles de tu compañia.", "You can give this user's profile a name that chord with your company's profiles."],
	CrearCampaña:["Crear campaña", "Create campaign"],
	ParrafoCampaña:["Si desactivas esta opción, este usuario solo podrá ver las campañas existentes en Notificator.", "If you deactivate this option, this user could only see the existing campaigns in Notificator."],
	Ashley:["Permitir uso de Ashley AI", "Allow use of Ashley AI"],
	ParrafoAshley:["Si activas esta opción, este usuario podrá enviar notificaciones a la base de datos de Notificator, esto podría generar cargos adicionales. Consulta con tu distribuidor local para más información.", "If you activate this option, this user will be able to send notifications to the database of Notificator, this may generate aditional charges. Check with your local distributor for more information."],
	ModificarLogotipo:["Permitir modificar logotipo", "Allow modify logo"],
	ParrafoModificarLogotipo:["Si activas esta opción, este usuario podrá cambiar el logotipo que ven tus suscriptores al suscribirse a tus listas de Notificator.", "If you activate this option, this user will be able to change the logo that your subscriptors will see when they subscribe to your lists in Notificator."],
	EditarMisCampañas:["Permitir editar mis campañas", "Allow edit my campaigns"],
	ParrafoEditarMisCampañas:["Si activas esta opción, este usuario podrá editar las campañas que haz creado hasta ahora.", "If you activate this option, this user will be able to edit campaigns that you have created until now."],
	ModificarFondo:["Permitir modificar fondo", "Allow modify background"],
	ParrafoModificarFondo:["Si activas esta opción, este usuario podrá cambiar el fondo de pantalla que ven tus suscriptores al suscribirse a tus listas de Notificator.", "If you activate this option, this user will be able to change the screen background that your subscriptors will see when they subscribe to your lists in Notificator."],

	//Bussines create campaign
	ConfigurarCampaña:["Configurar campaña", "Configure campaign"],
	FechaInicio:["Fecha de inicio", "Starting date"],
	FechaFin:["Fecha de finalización", "Ending date"],
	ZonaHoraria:["Zona horaria", "Time zone"],
	Hora:["Hora", "Time"],
	NotificacionBienvenida:["Notificacion de bienvenida", "Welcome notification"],
	Automatizacion:["Automatizacion", "Automation"],
	Repeticion:["Repeticion", "Repetation"],
	TextoNotificacionBienvenida:["Crea una notificacion primaria, para dar bienvenida a tus suscriptores.", "Create a primary notification to welcome your subscriptors."],
	TextoAutomatizacion:["Crea una secuencia de notificaciones para tus nuevos suscriptores.", "Create a new sequence of notifications to your new subscriptors."],
	TextoRepeticion:["Determina cuantas veces se repite el envio de cada notificacion.", "Setup how many times a notification will be repeated"],
	BaseDeDatos:["¿Qué base de datos usaremos?", "Which database are we going to use?"],
	TipoNotificacion:["Tipo de notificación", "Notification type"],
	Propia:["Propia", "Own database"],
	NotificacionSimple:["Notificacion simple", "Simple notification"],
	TituloNotificacion:["Titulo de la notificacion", "Notification Title"],
	AdjuntarImagen:["Adjuntar imagen", "Upload image"],
	Segmentacion:["Segmentacion", "Segmentation"],
	GeneroEdad:["Genero y edad", "Genre and age"],
	Hombres:["Hombres", "Men"],
	Mujeres:["Mujeres", "Women"],
	EquipoSO:["Dispositivo / Sistema Operativo", "Device / OS"],
	Ios:["iOS / iPhone", "iOS / iPhone"],
	Android:["Android", "Android"],
	Web:["Web / Navegadores", "Web / Browsers"],
	Ubicacion:["Ubicacion", "Location"],
	Todas:["Todas", "All locations"],
	Algunas:["Algunas", "Some locations"],
	Ciudades:["Ciudades", "Cities"],

	//Notipoints
	Lugares:["LUGARES", "PLACES"],
	Todos:["TODOS", "ALL"],
	verMenos:["Ver menos", "See less"],
}


const lenguage = (message) => {
 	const selectedLanguage = cookie.load('currentLanguage');
	const index = (selectedLanguage ? (selectedLanguage == "English" ? 1:0) : 0)

	if (data[message])
		return data[message][index]
	else
		console.log(message)

}

export default lenguage;
