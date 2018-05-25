package register

import (
	//"bytes"
	"encoding/json"
	//"fmt"
	"log"
	"net/http"

	"../../Controllers/User"
	"../../Models/ModelUser"
)

//Funcion para registrar un nuevo usuario
func Register(w http.ResponseWriter, r *http.Request) {

	user, people, _, cities, countries := user.GetUserRequest(r)

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var responseUser modeluser.ResponseUser

	val := modeluser.GetUsuario(user.Email)

	if !modeluser.ValideEmail(val.Email, user) {
			user_creado := modeluser.CreateUser(user, people, cities, countries)
			responseUser = modeluser.ResponseUser{"success", user_creado, "¡Usuario registrado con éxito!"}
			log.Println("Registro")
			json.NewEncoder(w).Encode(responseUser)
	} else {
		responseUser = modeluser.ResponseUser{"error", user, "Usuario ya existe."}
		json.NewEncoder(w).Encode(responseUser)
	}

}
