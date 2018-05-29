import Dashboard from '../layouts/Dashboard/Dashboard.jsx';
import Login from '../views/Login/Login.jsx';
import Register from '../views/Register/Register.jsx';

var indexRoutes = [
    { path: "/Dashboard", name: "Home", component: Dashboard },
    { path: "/register", name: "Register", component: Register },
    { path: "/login", name: "Login", component: Login }
];

export default indexRoutes;
