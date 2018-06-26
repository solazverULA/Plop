package modellisteners

import (
	"bytes"
	//"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	//"time"
	"../../connect"
	//webpush "../../src/github.com/sherclockholmes/webpush-go"
	"../ModelImages"
	"../ModelUser"
)

//Receptores
type Listeners struct {
	Id             					int    `gorm:"column:cilisteners" json:idlisteners`
}

type ListenersHasUsers struct {
	Listeners_idlisteners 			int `gorm:"column:listeners_cilisteners" json:listeners_idlisteners`
	Users_iduser          			int `gorm:"column:users_ciuser" json:users_iduser`
}

type ListenersForUsers struct {
	Listener 						Listeners
	Email    						string
}

type ListenersDevices struct {
	Listener 						Listeners
	Devices  						[]Devices
}

type ListenerVector struct {
	Ids 							[]string `json:Listener`
}

type Devices struct {
	Token                 			string `gorm:"column:token" json:Token`
	Auth                  			string `gorm:"column:auth" json:Auth`
	Endpoint              			string `gorm:"column:end_point" json:Endpoint`
	P256h                 			string `gorm:"column:p256h" json:P256h`
	Phonenumber           			string `gorm:"column:phone_number" json:Phonenumber`
	Os 					  			string `gorm:"column:os" json:Os`
	Listeners_idlisteners 			int    `gorm:"column:listeners_cilisteners" json:listeners_idlisteners`
}

type Notifications struct {
	Id                 				int    `gorm:"primary_key;column:idnotifications" json:idnotifications`
	Title              				string `gorm:"column:title" json:Title`
	Body               				string `gorm:"column:body" json:Body`
	Type 							int 	`gorm:"column:type" json:Type`
	Srcimage           				string `gorm:"column:src_image" json:Srcimage`
}

type ListenerAndNotifications struct {
	Status   						int       `json:Status`
	Date     						string    `json:Date`
	Listener 						Listeners `json:Listener`
}

type UsersSendNotifications struct {
	Notifications_idnotifications 	int `gorm:"column:notifications_idnotifications" json:Notifications_idnotifications`
  	Users_iduser 					int `gorm:"column:users_ciuser" json:Users_iduser`
}	

type ResponseDevices struct {
	Status  						string    	`json:Status`
	Data    						Devices 	`json:Devices`
	Message 						string    	`json:Message`
}

type ResponseListener struct {
	Status  						string    	`json:Status`
	Data    						People 		`json:Listeners`
	Message 						string    	`json:Message`
}

type People struct {
	Id           					int    		`gorm:"column:cipeople" json:Idprofiles`
	Nameprofile  					string 		`gorm:"column:name" json:Nameprofile`
	Gender 							string 		`gorm:"column:gender" json:Gender`
	Srclogo      					string 		`gorm:"column:src_logo" json:Srclogo`
	Srcicon      					string 		`gorm:"column:src_icon" json:Srcicon`
	Countries_idcountries 			int 		`gorm:"column:countries_idcountries" json:Countries_idcountries`
}

type Countries struct {
	Id                    			int    		`gorm:"primary_key;column:idcountries" json:idcountries`
	Namecountry           			string 		`gorm:"column:name_country" json:Namecountry`
}

//Crear nuevo receptor
func CreateListener(devices Devices, people People, iduser int) Listeners {
	var listener Listeners
	var listenerhasuser ListenersHasUsers
	var listenercompr Devices
	var user modeluser.Users

	connect.GetConnection().Table("users").Where("ciuser = ?", iduser).First(&user)
	phonenumber := strings.Split(devices.Phonenumber, " ")
	connect.GetConnection().Table("devices").Where("phone_number = ?", phonenumber[1]).First(&listenercompr)
	pais := ReturnCountry(phonenumber[0])
	log.Println(phonenumber)

	if listenercompr.Phonenumber == devices.Phonenumber {
		devices = listenercompr
		devices.Phonenumber = phonenumber[1]
		listenerhasuser.Listeners_idlisteners = listenercompr.Listeners_idlisteners
		listenerhasuser.Users_iduser = iduser
		//devices.Listeners_idlisteners = listenercompr.Id
		//if devices.Token != "" || devices.Auth != "" && devices.P256h != "" && devices.Endpoint != "" {
			connect.GetConnection().Create(&devices)
		//}//}

		connect.GetConnection().Create(&listenerhasuser)
		
	} else {
		var countries modeluser.Countries

		connect.GetConnection().Table("countries").Where("name_country = ?", pais).First(&countries)
		if countries.Id == 0 {
			countries.Namecountry = pais
			connect.GetConnection().Table("countries").Create(&countries)
		}
		people.Countries_idcountries = countries.Id
		connect.GetConnection().Table("people").Create(&people)
		
		var peoples []People
		connect.GetConnection().Table("people").Find(&peoples)
		peopleId := peoples[len(peoples)-1].Id
		fmt.Println("id", peopleId)

		listener.Id = peopleId
		connect.GetConnection().Create(&listener)
		//connect.GetConnection().Find(&listeners)
		//listenerId := listeners[len(listeners)-1].Id
		log.Println(listener.Id)
		listenerhasuser.Listeners_idlisteners = listener.Id
		devices.Listeners_idlisteners = listener.Id
		listenerhasuser.Users_iduser = iduser
		devices.Phonenumber = phonenumber[1]
		//if devices.Token != "" || devices.Auth != "" && devices.P256h != "" && devices.Endpoint != "" {
			connect.GetConnection().Create(&devices)
		//}
		connect.GetConnection().Create(&listenerhasuser)
	}

	return listener //Para usar luego esa id
}

//Función para ver todos los listener por OS
func GetAllListeners(os string) []Listeners {
	var devices []Devices
	var listeners []Listeners

	if os == "all" {
		connect.GetConnection().Select("*").Find(&listeners)
	} else {
		connect.GetConnection().Table("devices").Where("os = ?", os).Find(&devices)
		for i := 0; i < len(devices); i++ {
			var listener Listeners
			connect.GetConnection().Table("listeners").Where("cilisteners = ?", devices[i].Listeners_idlisteners).First(&listener)
			listeners = append(listeners, listener)
		}
	}

	return listeners
}

//Obtener los listener que un usuario tiene suscripto
func GetUsersOfListener(idlistener string) []modeluser.Users {
	var listenerhasuser []ListenersHasUsers
	var users []modeluser.Users
	connect.GetConnection().Where("listeners_cilisteners = ?", idlistener).Find(&listenerhasuser)
	for i := 0; i < len(listenerhasuser); i++ {
		var user modeluser.Users
		var profiles modeluser.People
		connect.GetConnection().Where("Users_iduser =?", listenerhasuser[i].Users_iduser).First(&profiles)
		connect.GetConnection().Where("ciuser =?", listenerhasuser[i].Users_iduser).First(&user)
		user.Created_at = modelimages.SearchIdDrive(profiles.Srcicon)
		user.Updated_at = profiles.Nameprofile
		users = append(users, user)
	}
	return users

}

//Funcion para agregar devices al listener
func AddDevices(listener_id int, devices Devices) Devices {

	devices.Listeners_idlisteners = listener_id
	var devicescomparar Devices
	connect.GetConnection().Where("os = ?", devices.Os).Where("token=?", devices.Token).Where("p256h=?", devices.P256h).Where("end_point=?", devices.Endpoint).Where("auth=?", devices.Auth).Where("listeners_cilisteners = ?", devices.Listeners_idlisteners).First(&devicescomparar)
	if devices.Os != devicescomparar.Os {
		connect.GetConnection().Create(&devices)
	}

	return devices
}

//funcion para enviar notificaciones
func SendNotificationOffline(notification Notifications, listenerIds ListenerVector) Notifications {
	//idnotification := strconv.Itoa(notification.Id)
	for k := 0; k < len(listenerIds.Ids); k++ {
		var listener Listeners
		connect.GetConnection().Where("cilisteners =?", listenerIds.Ids[k]).First(&listener)
		var devices []Devices
		connect.GetConnection().Where("listeners_cilisteners=?", listener.Id).Find(&devices)
		for j := 0; j < len(devices); j++ {
			if (devices[j].Os == "ios" || devices[j].Os == "android") {
				var jsonstr []byte
				//var profile UsersSendNotifications
				//connect.GetConnection().Where("users_iduser = ?", notification.Users_iduser).First(&profile)
				notificationtype := strconv.Itoa(notification.Type)
				idlistener := strconv.Itoa(listener.Id)

				//jsonstr = []byte(`{ "to":"` + devices[j].Token + `","data":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body + `","src":"` + modelimages.SearchIdDrive(notification.Srcimage) + `","srcExpandible":"` + modelimages.SearchIdDrive(notification.Srcimageexpandible) + `","icon":"` + modelimages.SearchIdDrive(profile.Srcicon) + `","type":` + notificationtype + `,"action":"` + notification.Action + `","idlisteners":` + idlistener + `,"namebutton":"` + notification.Namebutton + `"}}`)
				jsonstr = []byte(`{ "to":"` + devices[j].Token + `","data":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body + `","src":"` + modelimages.SearchIdDrive(notification.Srcimage) + `","type":` + notificationtype + `","idlisteners":` + idlistener + `,"namebutton":"` +`"}}`)
				url := "https://fcm.googleapis.com/fcm/send"
				log.Println(string(jsonstr))
				req, err := http.NewRequest("POST", url, bytes.NewBuffer(jsonstr))
				req.Header.Set("Authorization", "key=AAAAC-tGU2I:APA91bHbyYtdVnCaWbjeMnsVXfhGYNXPptz4MnbZCw1bs9aXp-qCWOwyoVIDuonh6E3ubbiYXEMx59xey8pMUrmI6iw5aZUvReaB4iO4qBsJxLy2wSeaozio24N388Jncyq4qnOVJ9mo")
				req.Header.Set("Content-Type", "application/json")
				fmt.Println("URL:>", url)
				client := &http.Client{}
				resp, err := client.Do(req)

				if err != nil {
					panic(err)
				}
				defer resp.Body.Close()

				fmt.Println("response Status:", resp.Status)
				fmt.Println("response Headers:", resp.Header)

				body, _ := ioutil.ReadAll(resp.Body)

				fmt.Println("response Body:", string(body))
				//notification.Resends += 1
			}/* else if listener.Agreeterms == 1 {
				var profile modeluser.People
				connect.GetConnection().Where("users_iduser = ?", notification.Users_iduser).First(&profile)
				fmt.Println("P256h:", devices[j].P256h)
				fmt.Println("Auth:", devices[j].Auth)
				fmt.Println("Endpoint:", devices[j].Endpoint)
				subjson := `{"Endpoint":"` + devices[j].Endpoint + `", "keys":{"p256dh":"` + devices[j].P256h + `", "auth":"` + devices[j].Auth + `"}}`

				var jsonstr []byte
				notificationtype := strconv.Itoa(notification.Type)
				idlistener := strconv.Itoa(listener.Id)
				if notification.Type != 8 {
					jsonstr = []byte(`{"notification":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body + `","src":"` + modelimages.SearchIdDrive(notification.Srcimage) + `","srcExpandible":"` + modelimages.SearchIdDrive(notification.Srcimageexpandible) + `","icon":"` + modelimages.SearchIdDrive(profile.Srcicon) + `","type":` + notificationtype + `,"action":"` + notification.Action + `","id":` + idnotification + `,"idlisteners":` + idlistener + `,"namebutton":"` + notification.Namebutton + `"}}`)

				} else {
					jsonstr = []byte(`{"notification":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body + `","src":"` + modelimages.SearchIdDrive(notification.Srcimage) + `","srcExpandible":"` + modelimages.SearchIdDrive(notification.Srcimageexpandible) + `","icon":"` + modelimages.SearchIdDrive(profile.Srcicon) + `","type":` + notificationtype + `,"id":` + idnotification + `,"idlisteners":` + idlistener + `}}`)

				}
				fmt.Println("response Body:", string(jsonstr))

				// Decode subscription
				privatekey, _, err := webpush.GenerateVAPIDKeys()
				if err != nil {
					fmt.Println("error:", err)
				} else {
					fmt.Println("key:", privatekey)
				}

				s := webpush.Subscription{}
				if err := json.NewDecoder(bytes.NewBufferString(subjson)).Decode(&s); err != nil {
					log.Fatal(err)
				}

				data, err := webpush.SendNotification([]byte(jsonstr), &s, &webpush.Options{
					Subscriber:      "mailto:<EMAIL@EXAMPLE.COM>",
					TTL:             691200,
					VAPIDPrivateKey: "SVJ3KdJCC4xKhhpsh7Hs6GgWkjUYrWZf5B9D3KzAfd8",
					Time_to_live:    691200,
				})
				if err != nil {
					log.Fatal(err)
				}
				log.Println(data)
				notification.Resends += 1
			}*/
		}

	}

	return notification
} 

//Función para ver si existe un listener
func GetListenerUser(iduser string) []People {
	var listenerhasuser []ListenersHasUsers
	//var idlistener []int
	var listenersuser []People
	var listener []People

	connect.GetConnection().Where("users_ciuser = ?", iduser).Find(&listenerhasuser) //Obtengo todos los usuarios que tienen la id pedida

	for i := 0; i < len(listenerhasuser); i++ {
		//idlistener = append(idlistener, listenerhasuser[i].Listeners_idlisteners)
		connect.GetConnection().Table("people").Where("cipeople = ?", listenerhasuser[i].Listeners_idlisteners).Find(&listenersuser)
		for j := 0; j < len(listenersuser); j++ {
			var devices Devices
			var countries Countries
			connect.GetConnection().Table("devices").Where("listeners_cilisteners = ?", listenersuser[j].Id).First(&devices)
			connect.GetConnection().Table("countries").Where("idcountries = ?", listenersuser[j].Countries_idcountries).First(&countries)
			listenersuser[j].Gender = devices.Phonenumber		
			listenersuser[j].Srcicon = countries.Namecountry	
			listener = append(listener, listenersuser[j])

		}
	}

	return listener
}

//Función para ver los listener por id
func GetListenerId(id string) People {
	listener := People{}

	connect.GetConnection().Table("people").Where("cipeople = ?", id).First(&listener)

	return listener
}

//Opcion de suscribir y desuscribir un listener
func SuscribeListener(phonenumber string) Devices {
	var listener Devices

	connect.GetConnection().Table("devices").Where("phone_number = ?", phonenumber).First(&listener)
	//listener.Agreeterms = 1
	//connect.GetConnection().Table("listeners").Where("number = ?", phonenumber).Updates(&listener)

	return listener
}

//Función para ver todos los listener y devices de un usuario
func ListenersAndDevices(iduser string) []ListenersDevices {
	var listenerhasuser []ListenersHasUsers
	var listenerdevices []ListenersDevices

	connect.GetConnection().Where("users_iduser = ?", iduser).Find(&listenerhasuser)
	for i := 0; i < len(listenerhasuser); i++ {
		var listener Listeners
		var devices []Devices
		connect.GetConnection().Where("idlisteners = ?", listenerhasuser[i].Listeners_idlisteners).First(&listener)
		connect.GetConnection().Where("listeners_idlisteners = ?", listenerhasuser[i].Listeners_idlisteners).Find(&devices)
		listenerdevices = append(listenerdevices, ListenersDevices{listener, devices})
	}
	return listenerdevices

}

//Función para actualizar datos del listener en la base de datos
func UpdateLis(people People, idlistener string) People {
	connect.GetConnection().Table("people").Where("cipeople = ?", idlistener).Updates(people)

	return people
}


//Funcion para determinar el nombre de un pais a partir de su codigo
func ReturnCountry(codigo string) string {
	paises := []struct {
        codigo  string
        country string
    }{
        {"+7", "Abjasia"},
        {"+93", "Afganistán"},
        {"+355", "Albania"},
        {"+49", "Alemania"},
        {"+244", "Angola"},
        {"+1264", "Anguilla"},
        {"+672", "Antartida"},
        {"+1268", "Antigua y Barbuda"},
        {"+599", "Antillas Holandesas"},
        {"+966", "Arabia Saudita"},
		{"+213", "Argelia"},
		{"+54", "Argentina"},
		{"+374", "Armenia"},
		{"+297", "Aruba"},
		{"+61", "Australia"},
		{"+43", "Austria"},
		{"+994", "Azerbaiyan"},
		{"+1242", "Bahamas"},
		{"+973", "Bahrein"},
		{"+880", "Bangladesh"},
		{"+1246", "Barbados"},
		{"+32", "Belgica"},
		{"+501", "Belice"},
		{"+229", "Benin"},
		{"+1441", "Bermudas"},
		{"+375", "Bielorrusia"},
		{"+591", "Bolivia"},
		{"+599", "Bonaire"},
		{"+387", "Bosnia-Herzegovina"},
		{"+267", "Botswana"},
		{"+55", "Brasil"},
		{"+673", "Brunei Darussalam"},
		{"+359", "Bulgaria"},
		{"+226", "Burkina Faso"},
		{"+257", "Burundi"},
		{"+975", "Butan"},
		{"+238", "Cabo Verde"},
		{"+855", "Camboya"},
		{"+237", "Camerun"},
		{"+1", "Canada"},
		{"+235", "Chad"},
		{"+56", "Chile"},
		{"+86", "China"},
		{"+357", "Chipre"},
		{"+57", "Colombia"},
		{"+269", "Comores"},
		{"+242", "Congo"},
    }

    for _, c := range paises {
        if codigo == c.codigo {
            return c.country
        } else {
        	return "Venezuela"
        }
    }
	return "Venezuela"
}
