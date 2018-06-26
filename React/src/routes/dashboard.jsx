import Dashboard from '../views/Dashboard/Dashboard.jsx';
import Notifications from '../views/Notifications/Notifications.jsx';
import Contacts from '../views/Contacts/Contacts.jsx';
import Groups from '../views/Groups/Groups.jsx';
import UserPage from '../views/UserPage/UserPage.jsx';

import language from "../api/translator/translator"
//import contacts from '../assets/icons/contacts.png'

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "design_app", component: Dashboard },
    { path: "/notifications", name: language("Notificaciones"), icon: "ui-1_bell-53", component: Notifications },
    { path: "/groups", name: language("Grupos"), icon: "users_single-02", component: Groups},
    { path: "/contacts", name: language("Contactos"), icon: "design_bullet-list-67", component: Contacts},
    { path: "/user-profile", name: language("Perfil"), component: UserPage, invisible: true },
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
