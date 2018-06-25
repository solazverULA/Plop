package notifications

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"log"
	"strconv"
	"../../Models/ModelNotifications"
	"../../Models/ModelListeners"
	//"io/ioutil"
	"mime/multipart"
)

func RegisterNotification(w http.ResponseWriter, r * http.Request) {
	
	vars := mux.Vars(r)
	user_id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	userid, _ := strconv.Atoi(user_id)

	ids, notification, file, handle, fileExpandible, handleExpandible := GetNotificationRequest(r) //Obtiene los datos del listener
	
	responsenotification := modelnotifications.ResponseNotifications{"success", modelnotifications.CreateNotifications(notification,ids, userid, file, handle, fileExpandible, handleExpandible), "Notificación registrada con éxito"}

	json.NewEncoder(w).Encode(responsenotification)
}

//Función para extraer del request el json de la notificacion
func GetNotificationRequest(r * http.Request) (modellisteners.ListenerVector, modelnotifications.Notifications , multipart.File ,*multipart.FileHeader, multipart.File, *multipart.FileHeader) {
	var ids modellisteners.ListenerVector
	var notification modelnotifications.Notifications
	//f := make(map[string]interface{})
	file, handle, err := r.FormFile("image")
    if err != nil {
        log.Println( "no hay imagen %v", err)
        file=nil
        handle=nil
    }
    fileExpandible, handleExpandible, err2 := r.FormFile("imageExpandible")
    if err2 != nil {
        log.Println( "no hay imagen %v", err2)
        fileExpandible=nil
        handleExpandible=nil
    }
    log.Println( "%v", file)
    notification.Title = r.FormValue("Title")
    notification.Body = r.FormValue("Body")
    //notification.Namebutton = r.FormValue("Namebutton")
    //notification.Action = r.FormValue("Action")
    notification.Type,_ = strconv.Atoi(r.FormValue("Type"))
 	//notification.Shendule = r.FormValue("Shendule")
 	//notification.Created_at = r.FormValue("Created_at")
    lenght, _ := strconv.Atoi(r.FormValue("lenghtListener"))
    for i := 0; i < lenght; i++ {
    	ids.Ids = append(ids.Ids, r.FormValue("Listener" +strconv.Itoa(i) ))
    	log.Println(ids.Ids[i])
    }

	return ids,notification, file, handle, fileExpandible, handleExpandible
}

//Función para enviar notificaciones a ios y android
func SendNotification(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	notification_id := vars["idnotification"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	response := modelnotifications.ResponseNotifications{"succes", modelnotifications.SendNotification(notification_id), "Notificación enviada con éxito"}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}

//Función para obtener las notificaciones por usuario
func GetNotificationUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	notificationid := vars["id"]

	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modelnotifications.GetNotificationUser(notificationid))

}

//Funcion para ver una notificacion
func GetNotification(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)
	notificationid := vars["id"]

	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modelnotifications.GetNotification(notificationid))
}

//Funcion para obtener los datos de listener_hasnotification
func GetListenerHasNotificacionRequest(r * http.Request) modelnotifications.ListenersReceiveNotifications {
	var listener_hasnotification modelnotifications.ListenersReceiveNotifications

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&listener_hasnotification)

	if err != nil {
		log.Fatal(err)
	}

	return listener_hasnotification
}



