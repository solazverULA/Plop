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

	devices, people := GetListenerRequest(r) //Obtiene los datos del listener
	json.NewEncoder(w).Encode(modellisteners.CreateListener(devices, people, userid))
}

//Función para extraer del request el json del listener
func GetListenerRequest(r * http.Request) (modellisteners.Devices, modellisteners.People){
	var devices modellisteners.Devices
	var people modellisteners.People

	body, err := ioutil.ReadAll(r.Body) //Convi
	json.Unmarshal(body, &struct { //Puedo dividir el json para las modellisteners profiles y user
		*modellisteners.Devices
		*modellisteners.People
	}{&devices, &people})

	if err != nil {
		log.Fatal(err)
	}

	return devices, people
}

//Función para actualizar el estado de un receptor si quiere recibir o no notificaciones cambiar para que solo suscriba y hacer otra que desuscriba
func SubscribeListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	phonenumber := vars["phonenumber"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//responselistener := modellisteners.ResponseListener{"succes",, "Agreeterms actualizado con éxito"}
	json.NewEncoder(w).Encode( modellisteners.SuscribeListener(phonenumber))	
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

//Función para ver los listeners de un usuario
func GetListenersUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//conexion con json
	json.NewEncoder(w).Encode(modellisteners.GetListenerUser(user_id))
}


//Funcion para obtener los usuarios de un listener
func GetUsers(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	json.NewEncoder(w).Encode(modellisteners.GetUsersOfListener(listenerid))
	
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

//Función para añadir devices a un listener
func AddDevices(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	id := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	listener_id, _ := strconv.Atoi(id)
	devices, _ := GetListenerRequest(r) //Obtiene los datos del listener
	json.NewEncoder(w).Encode(modellisteners.AddDevices(listener_id, devices))
}

//Función para ver los devices de un listener
func ListenersAndDevices(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	iduser := vars["iduser"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modellisteners.ListenersAndDevices(iduser))

}

//Función para actualizar datos del listener
func UpdateListener(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	listenerid := vars["idlisteners"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	_, people := GetListenerRequest(r)
	responselistener := modellisteners.ResponseListener{"succes", modellisteners.UpdateLis(people, listenerid), "Listener actualizado con éxito"}
	json.NewEncoder(w).Encode(responselistener)		
}