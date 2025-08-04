import { Route } from "react-router-dom";
import AddPageCategorie from "../../../pages/Boutique/Categories/AddPageCategorie";
import EditPageCategorie from "../../../pages/Boutique/Categories/EditPageCategorie";
import ListPageCategorie from "../../../pages/Boutique/Categories/ListPageCategorie";

 const categories_routes_items = {
  categorie: {
    path: "categorie",
    name: "Liste des Categories",
    component: ListPageCategorie,
  },
  add_categorie: {
    path: "categorie/add",
    name: "Nouvelle categorie",
    component: AddPageCategorie,
  },
  edit_categorie: {
    path: "categorie/edit/:ID_CATEGORY",
    name: "Modifier categorie",
    component: EditPageCategorie,
  },
};
var categories_routes = [];

for (let key in categories_routes_items) {
  const route = categories_routes_items[key];
  categories_routes.push(
    <Route path={route.path} Component={route.component} key={route.path} />
  );
}

export default categories_routes;
