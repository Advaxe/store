import { Route } from "react-router-dom";
import AddPill from "../../../pages/Boutique/Pills/AddPill";

 const pill_routes_items = {
  add_pill: {
    path: "pill/add",
    name: "New pill",
    component: AddPill,
  },

};
var pill_routes = [];

for (let key in pill_routes_items) {
  const route = pill_routes_items[key];
  pill_routes.push(
    <Route path={route.path} Component={route.component} key={route.path} />
  );
}

export default pill_routes;
