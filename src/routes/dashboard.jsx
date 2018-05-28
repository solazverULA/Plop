import Dashboard from '../views/Dashboard/Dashboard.jsx';
import Notifications from '../views/Notifications/Notifications.jsx';

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "design_app", component: Dashboard },
    { path: "/notifications", name: "Notifications", icon: "ui-1_bell-53", component: Notifications },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
