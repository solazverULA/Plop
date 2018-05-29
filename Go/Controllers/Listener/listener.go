package listener

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"../../Models/ModelListeners"
	"../../Models/ModelNotifications"
	"strconv"
	"io/ioutil"
)

//Receptores de notificaciones
func RegisterListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	user_id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userid, _ := strconv.Atoi(user_id)

	listener, devices := GetListenerRequest(r) //Obtiene los datos del listener
	json.NewEncoder(w).Encode(modellisteners.CreateListener(listener, devices, userid))
}

//Función para registrar un listener y sumar puntos al listener que compartio el link
func RegisterListenerWithListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	user_id := vars["id"]
	listener_id:= vars["idlistener"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userid, _ := strconv.Atoi(user_id)
	listenerid, _ := strconv.Atoi(listener_id)

	listener, devices := GetListenerRequest(r) //Obtiene los datos del listener
	json.NewEncoder(w).Encode(modellisteners.CreateListenerWithListener(listener, devices, userid, listenerid))
}

//Función para extraer del request el json del listener
func GetListenerRequest(r * http.Request) (modellisteners.Listeners, modellisteners.Devices){
	var listener modellisteners.Listeners
	var devices modellisteners.Devices
	body, err := ioutil.ReadAll(r.Body) //Convi
	json.Unmarshal(body, &struct { //Puedo dividir el json para las modellisteners profiles y user
		*modellisteners.Listeners
		*modellisteners.Devices
	}{&listener, &devices})
	if err != nil {
		log.Fatal(err)
	}

	return listener, devices
}
//funcion par obtener la ultima notification de un usuario 
func GetLastNotificationUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(modelnotifications.GetLastNotificationUser(listenerid))		
	
}
//Función para actualizar datos del listener
func UpdateListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	listener, _ := GetListenerRequest(r)
	responselistener := modellisteners.ResponseListener{"succes", modellisteners.UpdateLis(listener, listenerid), "Listener actualizado con éxito"}
	json.NewEncoder(w).Encode(responselistener)		
}

func AddDevices(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	id := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	listener_id, _ := strconv.Atoi(id)
	_, devices := GetListenerRequest(r) //Obtiene los datos del listener
	json.NewEncoder(w).Encode(modellisteners.AddDevices(listener_id, devices))
}

//Función para actualizar el estado de un receptor si quiere recibir o no notificaciones cambiar para que solo suscriba y hacer otra que desuscriba
func SubscribeListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	phonenumber := vars["phonenumber"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	responselistener := modellisteners.ResponseListener{"succes", modellisteners.SuscribeListener(phonenumber), "Agreeterms actualizado con éxito"}
	json.NewEncoder(w).Encode(responselistener)	
}

//Funcion para obtener los usuarios de un listener
func GetUsers(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(modellisteners.GetUsersOfListener(listenerid))
	
}

//Funcion para agregar usuario a listener
func AddUsers(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["id"]
	userid := vars["iduser"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(modellisteners.AddUsersToListener(userid, listenerid))
	
}

//Funcion para desuscribir un receptor
func UnsubscribeListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	phonenumber := vars["phonenumber"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	responselistener := modellisteners.ResponseListener{"succes", modellisteners.UnsubscribeListener(phonenumber), "Agreeterms actualizado con éxito"}
	json.NewEncoder(w).Encode(responselistener)	
}

//Función para aumentar el contador cuando se comparte
func Share(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	iduser := vars["iduser"]
	idlistener := vars["idlistener"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	listenerhu, profile := modellisteners.Share(iduser, idlistener)
	response := modellisteners.ResponseContador{"succes", listenerhu, profile, ""}

	json.NewEncoder(w).Encode(response)	
}

//Función para retornar los usuarios a los que se ha compartido
func ShareListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idlistener := vars["idlistener"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	listeners := modellisteners.ShareListener(idlistener)
	json.NewEncoder(w).Encode(listeners)	
}

//Función para ver todos los usuarios a los que no esta suscrito un listener
func AllUnsubscribedUsers(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idlistener := vars["idlistener"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modellisteners.AllUnsubscribedUsers(idlistener))
}

//Función para ver los devices de un listener
func ListenersAndDevices(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	iduser := vars["iduser"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modellisteners.ListenersAndDevices(iduser))

}

//Función para ver todos los listener pertenecientes a un SO 
func GetListeners(w http.ResponseWriter, r * http.Request) {
	os := r.URL.Query().Get("os")
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	//conexion base de datos
	listener := modellisteners.GetAllListeners(os)
	
	//conexion con json
	json.NewEncoder(w).Encode(listener)
}

//Función para ver los listeners de un usuario
func GetListenersUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	var listener []modellisteners.Listeners

	//conexion base de datos

	listener = modellisteners.GetListenerUser(user_id)

	//conexion con json
	json.NewEncoder(w).Encode(listener)
}

//Función para ver los listener por id
func GetListenersId(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	response := modellisteners.ResponseListener{"succes", modellisteners.GetListenerId(id), "Listener"}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}

//Funcion para obtener los listener que vieron una notificacion
func GetListenersNotifications(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")


	//conexion con json
	json.NewEncoder(w).Encode(modelnotifications.GetListenersNotifications(id))
}

//Función para ver los listener por su usuario 
//que retorne a que usuarios pertenecen esos listener cada listener a cuales usuarios pertenece el email
func GetListenersForUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modellisteners.GetListenersForUser(id))
}

//Funcion para ver los 5 ultimos listener
func LastListeners(w http.ResponseWriter, r * http.Request) {
	var listeners []modellisteners.Listeners
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	listeners = modellisteners.LastListeners()
	json.NewEncoder(w).Encode(listeners)
}

//Función para eliminar un listener
func DeleteListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listener_id := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	response := modellisteners.ResponseListener{"succes", modellisteners.DeleteLis(listener_id), "Ususario eliminado con éxito"}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}
func DeleteListenerUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listener_id := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	
	//conexion con json
	json.NewEncoder(w).Encode(modellisteners.DeleteListenerUser(listener_id))
}