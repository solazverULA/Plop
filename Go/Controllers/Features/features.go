package features

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"../../Models/ModelFeatures"
	"log"

)

//Función para actualizar datos del features
func UpdateFeatures(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idfeatures := vars["id"]
	
	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	features := GetFeaturesRequest(r)

	response := modelfeatures.ResponseFeatures{"succes", modelfeatures.UpdateFeatures(idfeatures, features), "Features actualizado con éxito"}
	json.NewEncoder(w).Encode(response)
}

//Función para obtener los datos de un features
func GetFeature(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idfeatures := vars["id"]
	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	response := modelfeatures.ResponseFeatures{"succes", modelfeatures.GetFeature(idfeatures), ""}
	json.NewEncoder(w).Encode(response)
}

//Función para extraer del request el json del features
func GetFeaturesRequest(r * http.Request) modelfeatures.Features{
	var features modelfeatures.Features

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&features)

	if err != nil {
		log.Fatal(err)
	}

	return features
}