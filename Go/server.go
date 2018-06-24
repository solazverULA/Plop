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
	"./Controllers/Features"
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
	r.HandleFunc("/getlisteners", listener.GetListeners).Methods("GET")
	r.HandleFunc("/user/{id}/getlisteners", listener.GetListenersUser).Methods("GET")
	r.HandleFunc("/listeners/{id}", listener.GetListenersId).Methods("GET")

	/*
	
	
	r.HandleFunc("/listeners/{id}/getallnotifications", listener.GetListenersNotifications).Methods("GET")
	r.HandleFunc("/getlistenersforuser/{id}", listener.GetListenersForUser).Methods("GET")
	r.HandleFunc("/lastlisteners", listener.LastListeners).Methods("GET")
	r.HandleFunc("/listeners/{idlisteners}/update", listener.UpdateListener).Methods("POST")
	r.HandleFunc("/listeners/{phonenumber}/subscribe", listener.SubscribeListener).Methods("GET")
	r.HandleFunc("/listeners/{id}/getusers", listener.GetUsers).Methods("GET")
	r.HandleFunc("/listeners/{id}/user/{iduser}/add", listener.AddUsers).Methods("GET")
	r.HandleFunc("/listeners/{phonenumber}/unsubscribe", listener.UnsubscribeListener).Methods("GET")
	r.HandleFunc("/user/{iduser}/devices", listener.ListenersAndDevices).Methods("GET")
	r.HandleFunc("/user/{idlistener}/unsubscribe", listener.AllUnsubscribedUsers).Methods("GET")
	r.HandleFunc("/listener/{idlisteners}/deletelistener", listener.DeleteListener).Methods("POST")
	r.HandleFunc("/listener/{idlisteners}/deleteuser", listener.DeleteListenerUser).Methods("POST")
	r.HandleFunc("/user/{iduser}/listener/{idlistener}/share", listener.Share).Methods("POST")
	r.HandleFunc("/listener/{idlistener}/share", listener.ShareListener).Methods("GET")
	r.HandleFunc("/listeners/{idlisteners}/adddevices", listener.AddDevices).Methods("POST")
	r.HandleFunc("/listener/{idlisteners}/lastnotificationuser", listener.GetLastNotificationUser).Methods("GET")

	*/

	//Rutas Features
	r.HandleFunc("/features/{id}/updatefeatures", features.UpdateFeatures).Methods("POST")
	r.HandleFunc("/features/{id}", features.GetFeature).Methods("GET")

/*
	//Rutas pagos
	r.HandleFunc("/getpayplans", payplans.GetPayPlans).Methods("GET")
	r.HandleFunc("/payplans/register", payplans.RegisterPayPlans).Methods("POST")
	r.HandleFunc("/payplans/{id}/edit", payplans.EditPayPlans).Methods("POST")
	r.HandleFunc("/payplans/{id}/delete", payplans.DeletePayPlans).Methods("POST")*/

	//Ruta para conectar con react
	r.PathPrefix("/").Handler(http.StripPrefix("/", http.FileServer(http.Dir("../React/build/"))))

	log.Println("El servidor se encuentra en el puerto 8001")
	log.Fatal(http.ListenAndServe(":8001", r))

}
