
import { Route } from "react-router-dom";
import UtilisateursListPage from "../../pages/utilisateurs/UtilisateurListPage";
import NewUtilisateurPage from "../../pages/utilisateurs/NewUtilisateurPage";
import EditUtilisateurPage from "../../pages/utilisateurs/EditUtilisateurPage";

export const administration_routes_items = {
          utilisateurs: {
                    path: "utilisateurs",
                    name: "Utilisateurs",
                    component: UtilisateursListPage
          },
          new_utilisateurs: {
                    path: "utilisateurs/new",
                    name: "Nouveau utilisateur",
                    component: NewUtilisateurPage
          },
          edit_utilisateurs: {
                    path: "utilisateurs/edit/:idUtilisateur",
                    name: "Modifier l'utilisateur",
                    component: EditUtilisateurPage
          }
}
var administration_routes = []
for(let key in administration_routes_items) {
          const route = administration_routes_items[key]
          administration_routes.push(<Route path={route.path} Component={route.component} key={route.path} />)
}
export default administration_routes