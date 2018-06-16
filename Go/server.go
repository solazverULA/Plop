package main

import (
	"log"
	"net/http"

	"./Controllers/Register"
	"./Controllers/Login"
	"./Controllers/Images"
	"./Controllers/User"
	"./Controllers/Notifications"
	"./Controllers/Listener"
	"./connect"
	"github.com/gorilla/mux"
)

func main() {

	connect.InicializarBaseDatos()
	//Para cerrar la conexion con la base de datos si se cae
	defer connect.CerrarConexion()

	//Rutas
	r := mux.NewRouter() //de esta forma se declara una variable para todas las rutas

	//Rutas crud usuarios
	r.HandleFunc("/user/{id}", user.GetUser).Methods("GET")
	r.HandleFunc("/getusers", user.GetUsers).Methods("GET")
	r.HandleFunc("/getuser", user.GetUserEmail).Methods("GET")
	r.HandleFunc("/user/{id}/update", user.UpdateUser).Methods("POST")
	//r.HandleFunc("/user/{id}/delete", user.DeleteUser).Methods("POST")

	//Rutas login
	r.HandleFunc("/login", login.Login).Methods("POST")

	//Rutas registro
	r.HandleFunc("/register", register.Register).Methods("POST")

	//Rutas imagenes
	r.HandleFunc("/upload/{name}", images.Upload).Methods("POST")
	r.HandleFunc("/images/getforname/{name}", images.GetImageForName).Methods("GET")
	r.HandleFunc("/images/getforid/{id}", images.GetImageForId).Methods("GET")
	r.HandleFunc("/deleteimage/{name}", images.DeleteImage).Methods("GET")

	//Rutas Notificaciones
	r.HandleFunc("/user/{id}/registernotification", notifications.RegisterNotification).Methods("POST")
	//r.HandleFunc("/notification/{id}/user", notifications.GetNotificationUser).Methods("GET")
	//r.HandleFunc("/notification/{id}/usersimple", notifications.GetNotificationUser).Methods("GET")
	//r.HandleFunc("/notification/{id}", notifications.GetNotification).Methods("GET")
	r.HandleFunc("/notifications/{idnotification}/send", notifications.SendNotification).Methods("POST")

	//Rutas listeners
	r.HandleFunc("/user/{id}/registerlistener", listener.RegisterListener).Methods("POST")
	r.HandleFunc("/listeners/{phonenumber}/subscribe", listener.SubscribeListener).Methods("GET")

	//Ruta para conectar con react
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("./React/build/"))))

	log.Println("El servidor se encuentra en el puerto 8001")
	log.Fatal(http.ListenAndServe(":8001", r))

}
