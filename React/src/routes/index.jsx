import Dashboard from '../layouts/Dashboard/Dashboard.jsx';
import Login from '../views/Login/Login.jsx';
import Register from '../views/Register/Register.jsx';
import ListenerWeb from '../views/ListenerWeb/ListenerWeb.jsx';
import Notification from '../views/NotificationWeb/NotificationWeb.jsx';
var indexRoutes = [
	{ path: "/register", name: "Register", component: Register },
    { path: "/login", name: "Login", component: Login },
    { path: "/notification/:id", name: "Login", component: Notification },
    { path: "/ListenerWeb/:id", name: "ListenerWeb", component: ListenerWeb },
    { path: "/", name: "Home", component: Dashboard },
    

];

export default indexRoutes;
