package payplans

import (
	"net/http"
	"encoding/json"
	"github.com/gorilla/mux"
	"../../Models/ModelPayPlans"
	"log"

)

//Funcion para registrar un nuevo plan de pago
func RegisterPayPlans(w http.ResponseWriter, r * http.Request) {
	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	payplans := GetPayPlanRequest(r)

	json.NewEncoder(w).Encode(modelpayplans.RegisterPayPlans(payplans))
}

//Función para obtener los datos de un feactures
func GetPayPlans(w http.ResponseWriter, r * http.Request) {

	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	
	json.NewEncoder(w).Encode(modelpayplans.GetPayPlans())
}

//Funcion para editar un plan de pago
func EditPayPlans(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idpayplan := vars["id"]

	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	payplans := GetPayPlanRequest(r)

	json.NewEncoder(w).Encode(modelpayplans.EditPayPlans(idpayplan, payplans))
}

//Funcion para eliminar un plan de pago
func DeletePayPlans(w http.ResponseWriter, r * http.Request) {
	vars := mux.Vars(r)		//Obtenemos los valores de la url
	idpayplan := vars["id"]

	w.Header().Set("Content-Type", "text/html; charsed-utf-8")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	json.NewEncoder(w).Encode(modelpayplans.DeletePayPlans(idpayplan))
}

//Funcion para obtener los datos del request
func GetPayPlanRequest(r * http.Request) modelpayplans.PayPlans{
	var payplans modelpayplans.PayPlans

	decoder := json.NewDecoder(r.Body)
	err := decoder.Decode(&payplans)

	if err != nil {
		log.Fatal(err)
	}

	return payplans
}