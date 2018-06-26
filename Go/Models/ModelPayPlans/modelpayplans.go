package modelpayplans

import (
	"../../connect"
	"fmt"
	"net/http"
	"encoding/json"
	"strconv"
	"bytes"
	"io/ioutil"

)

type ResponseCreditCardPayu struct {
	Code            		string `json:code`
	Error           		string `json:error`
	CreditCardToken struct {
		CreditCardTokenId    string `json:creditCardTokenId`
		Name                 string `json:name`
		PayerId              string `json:payerId`
		IdentificationNumber string `json:identificationNumber`
		PaymentMethod        string `json:paymentMethod`
		Number               string `json:number`
		ExpirationDate       string `json:expirationDate`
		CreationDate         string `json:creationDate`
		MaskedNumber         string `json:maskedNumber`
		ErrorDescription     string `json:errorDescription`
	}
}
type ResponsePayUser struct {
	Code                	string `json:code`
	Error               	string `json:error`
	TransactionResponse struct {
		OrderId                            string `json:orderId`
		TransactionId                      string `json:transactionId`
		State                              string `json:state`
		PaymentNetworkResponseCode         string `json:paymentNetworkResponseCode`
		PaymentNetworkResponseErrorMessage string `json:paymentNetworkResponseErrorMessage`
		TrazabilityCode                    string `json:trazabilityCode`
		AuthorizationCode                  string `json:authorizationCode`
		EndingReason                       string `json:endingReason`
		ResponseCode                       string `json:responseCode`
		ErrorCode                          string `json:errorCode`
		ResponseMessage                    string `json:responseMessage`
		TransactionDate                    string `json:transactionDate`
		TransactionTime                    string `json:transactionTime`
		OperationDate                      string `json:operationDate`
		ExtraParameters                    string `json:extraParameters`
	}
}

type Creditcard struct {
	Id             			int    `gorm:"primary_key;column:idcreditcard" json:idcreditcard`
	Name           			string `gorm:"column:name" json:Name`
	Securitycode   			string `gorm:"column:security_code" json:Securitycode`
	Number         			string `gorm:"column:number" json:Number`
	Token          			string `gorm:"column:token" json:Token`
	Code           			string `gorm:"column:code" json:Code`
	Status         			string `gorm:"column:status" json:Code`
	Identifynumber 			int    `gorm:"column:identify_number" json:Code`
	Datevec        			string `gorm:"column:date_vec" json:Datevec`
	Ownername     			string `gorm:"column:owner_name" json:Ownername`
	Users_iduser   			int    `gorm:"column:users_iduser" json:Users_iduser`
}

type ResponseCreditCard struct {
	Status   				string     `json:Status`
	DataCC   				Creditcard `json:CreditCard`
	Messagec 				string     `json:Messagec`
}

type PayPlans struct {
	Idpayplans    			int    `gorm:"primary_key;column:idpayplans" json:Idpayplans`
	Priceformonth 			int    `gorm:"column:price_for_month" json:Priceformonth`
	Nummonth      			int    `gorm:"column:num_month" json:Nummonth`
	Currency      			string `gorm:"column:currency" json:Currency`
}

type Payments struct {

	Id 						int 	`gorm:"primary_key;column:idpayments"` 
	Idpayu 					int 	`gorm:"column:idpayu"`
    Payment_date 			string  `gorm:"column:payment_date"`
  	Amount 					string  `gorm:"column:amount"`
  	Status 					string  `gorm:"column:status"`
    Payplans_idpayplans  	int 	`gorm:"column:payplans_idpayplans"`
  	Creditcard_idcreditcard int 	`gorm:"column:creditcard_idcreditcard"`
    Creditcard_users_iduser int 	`gorm:"column:creditcard_users_iduser"`
}

//Funcion para registrar un plan de pago
func RegisterPayPlans(payplans PayPlans) PayPlans {

	connect.GetConnection().Table("payplans").Create(&payplans) //Creara una id cada vez

	return payplans
}

//Funcion para ver los planes de pago
func GetPayPlans() []PayPlans {
	var payplans []PayPlans

	connect.GetConnection().Table("payplans").Select("*").Find(&payplans)

	return payplans
}



//Funcion para editar un plan de pago
func EditPayPlans(idpayplan string, payplans PayPlans) PayPlans {

	connect.GetConnection().Table("payplans").Where("idpayplans = ?", idpayplan).Updates(payplans)

	return payplans
}

//Funcion para eliminar un plan de pago
func DeletePayPlans(idpayplan string) PayPlans {
	var payplans PayPlans

	connect.GetConnection().Table("payplans").Where("idpayplans = ?", idpayplan).Delete(&payplans)

	return payplans
}

//Funcion para registrar tarjeta de credito
func RegisterCreditCard(id string, creditcard Creditcard) ResponseCreditCardPayu {

	url := "https://api.payulatam.com/payments-api/4.0/service.cgi" //Ruta

	var jsonStr = []byte(`{
	   "language": "es",
	   "command": "CREATE_TOKEN",
	   "merchant": {
	      "apiLogin": "86jbg3I5i01nzRN",
	      "apiKey": "GIwS0pKO7UHDM5CYcAOCZ7Il00"
	   },
	   "creditCardToken": {
	      "payerId": "` + id + `",
	      "name": "` + creditcard.Ownername + `",
	      "identificationNumber": "1234",
	      "paymentMethod": "` + creditcard.Code + `",
	      "number": "` + creditcard.Number + `",
	      "expirationDate": "` + creditcard.Datevec + `"
	   }
	}`)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonStr))

	fmt.Println("URL:>", url)
	fmt.Println(string(jsonStr))
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)

	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	fmt.Println("response Status:", resp.Status)
	fmt.Println("response Headers:", resp.Header)

	body, _ := ioutil.ReadAll(resp.Body)
	var response ResponseCreditCardPayu
	json.Unmarshal(body, &response)
	fmt.Println("response Body:", string(body))
	if response.Code == "SUCCESS" {
		creditcard.Users_iduser, _ = strconv.Atoi(id)
		creditcard.Token = response.CreditCardToken.CreditCardTokenId
		fmt.Println("response Body:", response)
		connect.GetConnection().Table("creditcard").Create(&creditcard) //Creara una id cada vez
	}

	return response
}

//Funcion para eliminar una tarjeta de credito
func DeleteCreditCard(id string) Creditcard {
	var creditcard Creditcard

	connect.GetConnection().Table("creditcard").Where("idcredit_card = ? ", id).First(&creditcard)
	connect.GetConnection().Delete(&creditcard)

	return creditcard
}
