package listener

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"../../Models/ModelListeners"
	//"../../Models/ModelNotifications"
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

//Función para ver los devices de un listener
func ListenersAndDevices(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	iduser := vars["iduser"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modellisteners.ListenersAndDevices(iduser))

}