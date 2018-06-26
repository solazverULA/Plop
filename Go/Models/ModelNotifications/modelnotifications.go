package modelnotifications

import (
	"bytes"
	//"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"mime/multipart"
	"net/http"
	"strconv"
	//"time"
	"../../connect"
	//webpush "../../src/github.com/sherclockholmes/webpush-go"
	//"../ModelFeatures"
	"../ModelImages"
	"../ModelListeners"
	//"../ModelOthers"
	"../ModelUser"
	"google.golang.org/api/drive/v3"
)

type Notifications struct {
	Id                 				int    `gorm:"primary_key;column:idnotifications" json:idnotifications`
	Title              				string `gorm:"column:title" json:Title`
	Body               				string `gorm:"column:body" json:Body`
	Type 							int 	`gorm:"column:type" json:Type`
	Srcimage           				string `gorm:"column:src_image" json:Srcimage`
}

type ResponseNotifications struct {
	Status 							string        `json:Status`
	Data     						Notifications `json:Notifications`
	MessageP 						string        `json:Messagen`
}

type ListenersReceiveNotifications struct {
	Listeners_idlisteners         	int    `gorm:"column:listeners_cilisteners" json:listeners_idlisteners`
	Notifications_idnotifications 	int    `gorm:"column:notifications_idnotifications" json:notifications_idnotifications`
}

type UsersSendNotifications struct {
	Notifications_idnotifications 	int `gorm:"column:notifications_idnotifications" json:Notifications_idnotifications`
  	Users_iduser 					int `gorm:"column:users_ciuser" json:Users_iduser`
}	

type AllNotifications struct {
	EmailUser      					string
	Notifications  					Notifications
	ListenersNames 					[]string
}

type responseNotificationSimple struct {
	Title 							string
	Body  							string
}

type NotificationsAll struct {
	EmailUser     					string
	Notifications 					Notifications
	Listeners     					[]modellisteners.Listeners
}

type NotificationsSimple struct {
	EmailUser     					string
	Notifications 					responseNotificationSimple
	Listeners     					[]modellisteners.Listeners
}

//Función para enviar notificaciones a dispositivos ios y android
func SendNotification(idnotification string) Notifications {
	var notification Notifications
	var listenerhasnotifications []ListenersReceiveNotifications
	connect.GetConnection().Where("idnotifications = ?", idnotification).First(&notification)
	connect.GetConnection().Where("notifications_idnotifications = ?", idnotification).Find(&listenerhasnotifications)
	//fmt.Println(len(notification.Shendule))
	/*if len(notification.Shendule) > 1 {
		jstime, _ := time.Parse("Mon Jan 02 2006 15:04:05 GMT-0700 (MST)", notification.Shendule)

		fmt.Printf(jstime.Format("2006-01-02 15:04:05.000000000 -0700 MST"))
		notificactionShendule = append(notificactionShendule, ShenduleNotification{Id: idnotification, Date: jstime, Repete: 1})
		notification.Shendule = " "
		connect.GetConnection().Table("notifications").Where("idnotifications = ?", idnotification).Updates(notification)
		return notification
	}*/
	for i := 0; i < /*len(listenerhasnotifications)*/1; i++ {
		var listener modellisteners.Listeners
		//connect.GetConnection().Where("cilisteners =?", listenerhasnotifications[i].Listeners_idlisteners).First(&listener)
		var devices []modellisteners.Devices
		connect.GetConnection().Where("listeners_cilisteners=?", listener.Id).Find(&devices)
		for j := 0; j < /*len(devices)*/ 1; j++ {
			
				var jsonstr []byte
				//var profile modeluser.People
				//var feactureUser modelfeatures.Featureuser
				//connect.GetConnection().Table("featureuser").Where("users_iduser = ?", notification.Users_iduser).First(&feactureUser)
				//feactureUser.Sendnotification++
				/*if notification.Resends > 1 {
					feactureUser.Resendnotification++
				}*/
				//connect.GetConnection().Table("featureuser").Where("users_iduser = ?", notification.Users_iduser).Updates(&feactureUser)
				//connect.GetConnection().Where("users_iduser = ?", notification.Users_iduser).First(&profile)
				//notificationtype := strconv.Itoa(notification.Type)
				idlistener := strconv.Itoa(listener.Id)

				//jsonstr = []byte(`{ "to":"` + devices[j].Token + `","data":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body + `","src":"` + modelimages.SearchIdDrive(notification.Srcimage) + `","srcExpandible":"` + modelimages.SearchIdDrive(notification.Srcimageexpandible) + `","icon":"` + modelimages.SearchIdDrive(profile.Srcicon) + `","type":` + notificationtype + `,"action":"` + notification.Action + `","id":` + idnotification + `,"idlisteners":` + idlistener + `,"namebutton":"` + notification.Namebutton + `"}}`)
				jsonstr = []byte(`{ "to":"c84oxjTlgEU:APA91bHw1Eb38k7r4gIAQiajoDPHcUOfoOd9Dub5iN9b2eF8UfPvHvX34xNDTPEEh2_dtEkVbTAxq-XsoMrH4gyNgToyRkJ09_fKDvYqECm8GUIEIbbwx9rlLLI_Jqrpju9LqGXMulnN","data":{"title":"` + notification.Title + `",` + `"body":"` + notification.Body /*` + modelimages.SearchIdDrive(notification.Srcimage) + `*/ + `","src":"","type":1,"idlisteners":` + idlistener + `,"namebutton":"` +`"}}`)

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
			/* else if listener.Agreeterms == 1 {
				var profile modeluser.Profiles
				var feactureUser modelfeatures.Featureuser
				connect.GetConnection().Where("users_iduser = ?", notification.Users_iduser).First(&profile)
				connect.GetConnection().Table("featureuser").Where("users_iduser = ?", notification.Users_iduser).First(&feactureUser)
				feactureUser.Sendnotification++
				if notification.Resends > 1 {
					feactureUser.Resendnotification++
				}
				connect.GetConnection().Table("featureuser").Where("users_iduser = ?", notification.Users_iduser).Updates(&feactureUser)
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
	connect.GetConnection().Table("notifications").Where("idnotifications = ?", idnotification).Updates(notification)

	return notification
}

//Función para crear una nueva notificación
func CreateNotifications(notification Notifications, Listener modellisteners.ListenerVector, userid int, File multipart.File, Handle *multipart.FileHeader, FileExpandible multipart.File, HandleExpandible *multipart.FileHeader) Notifications {

	listenerhasnotifications := ListenersReceiveNotifications{}
	usersendnotifications := UsersSendNotifications{}
	//notification.Users_iduser = userid

	connect.GetConnection().Create(&notification) //Creara una id cada vez
	iduser := strconv.Itoa(userid)

	usersendnotifications.Notifications_idnotifications = notification.Id
	usersendnotifications.Users_iduser = userid
	connect.GetConnection().Create(&usersendnotifications)
	
	
	iddriveuserfolder := modelimages.SearchIdDrive("UserNotification" + iduser)

	id := strconv.Itoa(notification.Id)
	if iddriveuserfolder == "" {
		if modelimages.SearchIdDrive("User"+iduser) == "" {
			vector := []string{modelimages.NotificatorDriveFolderId()}
			file_metadata := &drive.File{
				Name:     "User" + iduser,
				MimeType: "application/vnd.google-apps.folder",
				Parents:  vector,
			}

			file, err := modelimages.GetSrv().Files.Create(file_metadata).Do()
			if err != nil {
				log.Printf("Failed to create file %v", err)
			}

			log.Printf("File: %+v", file)
			iduserfolder := file.Id

			vector = []string{iduserfolder}
			file_metadata = &drive.File{
				Name:     "UserNotification" + iduser,
				MimeType: "application/vnd.google-apps.folder",
				Parents:  vector,
			}

			file, err = modelimages.GetSrv().Files.Create(file_metadata).Do()
			if err != nil {
				log.Printf("Failed to create file %v", err)
			}

			log.Printf("File: %+v", file)
			iddriveuserfolder = file.Id

		}
	}

	vector := []string{iddriveuserfolder}
	notificationid := modelimages.SearchIdDrive("Notifications" + id)
	if notificationid == "" {
		file_metadata := &drive.File{
			Name:     "Notifications" + id,
			MimeType: "application/vnd.google-apps.folder",
			Parents:  vector,
		}

		file, err := modelimages.GetSrv().Files.Create(file_metadata).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)
		notificationid = file.Id
	}

	if File != nil {

		vector = []string{notificationid}
		data, err := ioutil.ReadAll(File)
		if err != nil {
			log.Printf("%+v", err)
			return notification
		}
		id = strconv.Itoa(notification.Id)
		//permision, _ := modelimages.GetSrv().Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
		var file_metadata *drive.File
		if notification.Type == 7 {
			file_metadata = &drive.File{
				Name:     "FileServer" + id,
				MimeType: "application/vnd.google-apps.document",
				Parents:  vector,
			}
			//var defaultvalues modelothers.Defaultvalues
			//connect.GetConnection().Table("defaultvalues").Where("iddefaultvalues = ?", "1").First(&defaultvalues)
			//notification.Srcimage = defaultvalues.Defaultbackgroundimage
			//notification.Srcimageexpandible = "FileServer" + id
		} else {
			file_metadata = &drive.File{
				Name:     "ImageServer" + id,
				MimeType: Handle.Header.Get("Content-Type"),
				Parents:  vector,
			}
			notification.Srcimage = "ImageServer" + id
		}

		file, err := modelimages.GetSrv().Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)
		permissiondata := &drive.Permission{
			Type:               "anyone",
			Role:               "reader",
			Domain:             "",
			AllowFileDiscovery: true,
		}
		pres, err := modelimages.GetSrv().Permissions.Create(file.Id, permissiondata).Do()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Printf("%s, %s\n", pres.Type, pres.Role)

	} /*else {
		var defaultvalues modelothers.Defaultvalues
		connect.GetConnection().Table("defaultvalues").Where("iddefaultvalues = ?", "1").First(&defaultvalues)
		notification.Srcimage = defaultvalues.Defaultbackgroundimage
	}*/

	if FileExpandible != nil {
		log.Printf("entro en expansible")
		vector = []string{notificationid}
		data, err := ioutil.ReadAll(FileExpandible)
		if err != nil {
			log.Printf("%+v", err)
			return notification
		}
		id = strconv.Itoa(notification.Id)
		//permision, _ := modelimages.GetSrv().Permissions.Create("file.Id,", &drive.Permission{Role:"owner", Type:"anyone"}).Do()
		file_metadata := &drive.File{
			Name:     "ImageServerExpandible" + id,
			MimeType: HandleExpandible.Header.Get("Content-Type"),
			Parents:  vector,
		}
		file, err := modelimages.GetSrv().Files.Create(file_metadata).Media(bytes.NewReader(data)).Do()
		if err != nil {
			log.Printf("Failed to create file %v", err)
		}

		log.Printf("File: %+v", file)
		permissiondata := &drive.Permission{
			Type:               "anyone",
			Role:               "reader",
			Domain:             "",
			AllowFileDiscovery: true,
		}
		pres, err := modelimages.GetSrv().Permissions.Create(file.Id, permissiondata).Do()
		if err != nil {
			log.Printf("Error: %v", err)
		}
		fmt.Printf("%s, %s\n", pres.Type, pres.Role)

		//notification.Srcimageexpandible = "ImageServerExpandible" + id
	}

	connect.GetConnection().Table("notifications").Where("idnotifications = ?", notification.Id).Updates(notification)
	for i := 0; i < len(Listener.Ids); i++ {
		id, _ := strconv.Atoi(Listener.Ids[i])
		listenerhasnotifications.Listeners_idlisteners = id
		//listenerhasnotifications.Notifications_users_iduser = userid
		listenerhasnotifications.Notifications_idnotifications = notification.Id
		connect.GetConnection().Create(&listenerhasnotifications)
	}
	SendNotification(strconv.Itoa(notification.Id))
	return notification //Para usar luego esa id
}

//Funcion para ver las notificaciones por usuario
func GetNotificationUser(iduser string) []NotificationsAll {

	var notificationsall []NotificationsAll
	var notification []Notifications
	var usersendnotifications []UsersSendNotifications
	connect.GetConnection().Where("users_ciuser = ?", iduser).Find(&usersendnotifications)
	for i := 0; i < len(usersendnotifications); i++ {
		var notifi Notifications
		connect.GetConnection().Where("idnotifications = ?", usersendnotifications[i].Notifications_idnotifications).First(&notifi)
		notification = append(notification, notifi)
	}

	//var namelisteners []string
	for j := 0; j < len(notification); j++ {
		if notification[j].Title != "" {
			var listeners []modellisteners.Listeners
			var user modeluser.Users

			var listenerhasnotifications []ListenersReceiveNotifications
			connect.GetConnection().Where("ciuser = ?", iduser).First(&user)
			connect.GetConnection().Where("notifications_idnotifications = ?", notification[j].Id).Find(&listenerhasnotifications)
			for i := 0; i < len(listenerhasnotifications); i++ {
				var listeneraux modellisteners.Listeners
				connect.GetConnection().Where("cilisteners = ?", listenerhasnotifications[i].Listeners_idlisteners).First(&listeneraux)
				listeners = append(listeners, listeneraux)
			}

			notification[j].Srcimage = modelimages.SearchIdDrive(notification[j].Srcimage)
			notificationsall = append(notificationsall, NotificationsAll{user.Email, notification[j], listeners})
		}
	}

	return notificationsall
}

//Funcion para conectar con la base de datos y ver una notificacion
func GetNotification(idnotification string) NotificationsAll {
	var notification Notifications
	var user modeluser.Users
	var usersendnotifications UsersSendNotifications
	var listenerhasnotifications []ListenersReceiveNotifications

	connect.GetConnection().Where("idnotifications = ?", idnotification).First(&notification)
	connect.GetConnection().Where("notifications_idnotifications = ?", notification.Id).Find(&listenerhasnotifications)
	connect.GetConnection().Where("notifications_idnotifications = ? ", notification.Id).First(&usersendnotifications)
	connect.GetConnection().Where("ciuser = ?", usersendnotifications.Users_iduser).First(&user)
	//log.Println(listenerhasnotifications)

	var listeners []modellisteners.Listeners
	for j := 0; j < len(listenerhasnotifications); j++ {
		var listener modellisteners.Listeners
		connect.GetConnection().Where("cilisteners	= ?", listenerhasnotifications[j].Listeners_idlisteners).First(&listener)
		listeners = append(listeners, listener)
	}
	notification.Srcimage = modelimages.SearchIdDrive(notification.Srcimage)
	notificationsall := NotificationsAll{user.Email, notification, listeners}
	//notificationsall := NotificationsAll{"ana", notification, listeners}

	return notificationsall

}

//Función para ver las notificaciones por receptor
func GetListenersNotifications(id string) []AllNotifications {
	var listenerhasnotifications []ListenersReceiveNotifications
	var user modeluser.Users
	var allnotifications []AllNotifications

	connect.GetConnection().Where("listeners_cilisteners = ?", id).Find(&listenerhasnotifications)

	var listeners []string
	for j := 0; j < len(listenerhasnotifications); j++ {
		var usersendnotifications UsersSendNotifications
		connect.GetConnection().Where("notifications_idnotifications = ? ", listenerhasnotifications[j].Notifications_idnotifications).First(&usersendnotifications)
		connect.GetConnection().Where("ciuser = ?", usersendnotifications.Users_iduser).First(&user)
		var notification Notifications
		connect.GetConnection().Where("idnotifications = ?", listenerhasnotifications[j].Notifications_idnotifications).First(&notification)
		notification.Srcimage = modelimages.SearchIdDrive(notification.Srcimage)
		allnotifications = append(allnotifications, AllNotifications{user.Email, notification, listeners})
	}

	return allnotifications
}