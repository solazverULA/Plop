package connect

import (
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/mysql"
	"github.com/satori/go.uuid"
)

var connection *gorm.DB
var connectionbusiness *gorm.DB

const engine_sql string = "mysql"

//Actualiza todas las Id
func BeforeCreate(scope *gorm.Scope) {
	id, err := uuid.NewV4()
	if err != nil {
		log.Println(err)
	}
	scope.SetColumn("Id", id)
}

//Inicializa la Base de Datos
func InicializarBaseDatos() {
	//connection = ConexionORM(CrearString("root", "", "notificator"))
	//connection = ConexionORM(CrearString("root", "Soporte2011", "notificator"))
	connection = ConexionORM(CrearString("root", "", "notificator"))
	connectionbusiness = ConexionORM(CrearString("root", "", "business"))

	log.Println("La conexión con la base de datos fue exitosa.")

	connection.Callback().Create().Register("BeforeCreate", BeforeCreate)
	//connectionbusiness.Callback().Create().Register("BeforeCreateBussines", BeforeCreate)
	connection.LogMode(true)
	connectionbusiness.LogMode(true)
}

func GetConnection() *gorm.DB {
	return connection
}

func GetConnectionBusiness() *gorm.DB {
	return connectionbusiness
}

//Cierra la conexion con la base de datos
func CerrarConexion() {
	connection.Close()
	connectionbusiness.Close()
	log.Println("La conexión con la base de datos ha sido cerrada.")
}

//Funcion para conectar con Mysql
func ConexionORM(stringConnection string) *gorm.DB {
	connection, err := gorm.Open(engine_sql, stringConnection)

	if err != nil {
		log.Fatal(err)
		return nil
	}

	return connection
}

//GORM necesita un string del tipo usuario:contraseña@/database
func CrearString(usuario string, contraseña string, database string) string {
	return usuario + ":" + contraseña + "@/" + database
}
