import Dashboard from '../layouts/Dashboard/Dashboard.jsx';
import Login from '../views/Login/Login.jsx';
import Register from '../views/Register/Register.jsx';
import Notifications from '../views/Notifications/Notifications.jsx';

var indexRoutes = [
    { path: "/Dashboard", name: "Home", component: Dashboard },
    { path: "/register", name: "Register", component: Register },
    { path: "/notifications", name: "Notifications", icon: "ui-1_bell-53", component: Notifications },
    { path: "/login", name: "Login", component: Login }
];

export default indexRoutes;
