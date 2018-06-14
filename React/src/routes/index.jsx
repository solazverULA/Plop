import Dashboard from '../layouts/Dashboard/Dashboard.jsx';
import Login from '../views/Login/Login.jsx';
import Register from '../views/Register/Register.jsx';
import ListenerWeb from '../views/ListenerWeb/ListenerWeb.jsx';

var indexRoutes = [
    { path: "/", name: "Home", component: Dashboard },
    { path: "/register", name: "Register", component: Register },
    { path: "/login", name: "Login", component: Login },
    { path: "/ListenerWeb", name: "ListenerWeb", component: ListenerWeb }
];

export default indexRoutes;
