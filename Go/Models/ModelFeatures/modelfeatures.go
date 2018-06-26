package modelfeatures

import (
	"../../connect"
)

type Features struct {
	Id                   int `gorm:"primary_key;column:idfeatures" json:idfeatures`
	Sendnotification     int `gorm:"column:send_notification" json:Sendnotification`
	Resendnotification   int `gorm:"column:resend_notification" json:Resendnotification`
	Schedulenotification int `gorm:"column:schedule_notification" json:Schedulenotification`
	Creategroups         int `gorm:"column:create_groups" json:Creategroups`
	Customlogo           int `gorm:"column:custom_logo" json:Customlogo`
	Notificationtypes    int `gorm:"column:notification_types" json:Type`
}

type ResponseFeatures struct {
	Status      		string      `json:Status`
	DataF       		Features    `json:Feature`
	MessageF    		string      `json:Messagef`
}


//Función para actualizar datos de features
func UpdateFeatures(idfeatures string, features Features) Features {

	connect.GetConnection().Table("features").Where("idfeatures = ?", idfeatures).Updates(features)

	return features
}

//Función para ver un feature
func GetFeature(idfeatures string) Features {
	var feature Features

	connect.GetConnection().Table("features").Where("idfeatures = ?", idfeatures).First(&feature)

	return feature
}

