import { Route } from "react-router-dom";
import Main from "../../pages/components/Main";

export const main_routes_items = {
  component : {
    path: "main",
    name: "main",
    component: Main
}
}
var main_routes = []

for (let key in main_routes_items){

const route = main_routes_items[key]
main_routes.push(<Route path={route.path} Component={route.component} key={route.path}/>)

}

export default main_routes