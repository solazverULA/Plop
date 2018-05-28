package user

import (
	"net/http"
	"encoding/json"
	"../../Models/ModelUser"
	"strconv"
	"github.com/gorilla/mux"
	"mime/multipart"
	"log"
	"io/ioutil"
	"fmt"
)

//Funcion para ver el usuario
func GetUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]
	var status string
	
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//conexion base de datos
	user, people, rolid, cities, countries := modeluser.GetUser(user_id)

	//Validar si el usuario existe
	if user.Id <= 0 {
		status = "error"
	} else {
		status = "success"
	}	

	response := modeluser.ResponseUserId{status, user, people, rolid, cities, countries}

	//conexion con json
	json.NewEncoder(w).Encode(response)
}

//Funcioón para ver el usuario por el email
func GetUserEmail(w http.ResponseWriter, r * http.Request) {
	email := r.URL.Query().Get("email")
	var succes string
	var message string

	useremail := modeluser.GetUsuario(email)
	if useremail.Id <=0 {
		log.Println("No encontrado")
		succes = "error"
		message = "Usuario no existe"		
	} else {
		log.Println("encontrado")
		succes = "succes"
		message = ""
	}
	response := modeluser.ResponseUser{succes, useremail, message}

	json.NewEncoder(w).Encode(response)
}

//Función para actualizar datos del usuario
func UpdateUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]

	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	user, people, _, cities, countries := GetUserRequest(r)

	response := modeluser.ResponseUser{"succes", modeluser.UpdateUs(user_id, user, people, cities, countries), "Usuario actualizado con éxito"}
	json.NewEncoder(w).Encode(response)
}

//Función para eliminar un usuario
func DeleteUser(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	user_id := vars["id"]
	w.Header().Set("Content-Type", "text/html; charset-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	//user, _, _ , _, _ := modeluser.GetUser(user_id)
	
	response := modeluser.ResponseUser{"succes", modeluser.DeleteUser(user_id), "Ususario eliminado con éxito"}
	json.NewEncoder(w).Encode(response)
	
}

//Función para extraer del request el json del usuario
func GetUserRequest(r *http.Request) (modeluser.Users, modeluser.People, modeluser.Roles, modeluser.Cities, modeluser.Countries) {
	var user modeluser.Users
	var people modeluser.People
	var rol modeluser.Roles
	var cities modeluser.Cities
	var countries modeluser.Countries

	body, err := ioutil.ReadAll(r.Body) //Convierte el r.body en un json, ioutill convierte r a formato json
	//log.Println(body)

	json.Unmarshal(body, &struct { //Puedo dividir el json para las modeluser profiles y user
		*modeluser.Users
		*modeluser.People
		*modeluser.Roles
		*modeluser.Cities
		*modeluser.Countries
	}{&user, &people, &rol, &cities, &countries})


	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(people)
	fmt.Println("llego bien aqui")

	return user, people, rol, cities, countries
}

//Función para obtener los datos de solo el usuario
func GetRequestUser(r *http.Request) modeluser.Users {
	var user modeluser.Users

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&user)
	log.Println(r.Body)

	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("llego bien aqui")

	return user
}

///Funcion para agregar los datos del registro con la imagen incluida
func GetDataFromUser(r *http.Request) (modeluser.Users, modeluser.People, modeluser.Cities, modeluser.Countries, multipart.File, *multipart.FileHeader) {
	var profile modeluser.People
	var user modeluser.Users
	var cities modeluser.Cities
	var countries modeluser.Countries

	file, handle, err := r.FormFile("image")
	if err != nil {
		log.Println("no hay imagen %v", err)
		file = nil
		handle = nil
	}
	log.Println("%v", file)
	user.Email = r.FormValue("Email")
	user.Password = r.FormValue("Password")
	Roles_idrole, _ := strconv.Atoi(r.FormValue("Roles_idrole"))
	user.Roles_idrole = Roles_idrole

	profile.Nameprofile = r.FormValue("Nameprofile")
	profile.Gender = r.FormValue("Gender")

	cities.Namecities = r.FormValue("Namecities")
	countries.Namecountry = r.FormValue("Namecountry")

	log.Println("usuario: ")
	log.Println(user)

	return user, profile, cities, countries, file, handle
}
