import { Route, Routes } from "react-router-dom";
import RootPage from "../pages/home/RootPage";
import administration_routes from "./admin/administration_routes";
import categories_routes from "./Boutique/Categorie/categorie_routes";
import article_routes from "./Boutique/Categorie/Article/article_routes";
import main_routes from "./components/Main.routes";
import pill_routes from "./Boutique/Pill/pill_routes";

export default function RoutesProvider() {
  return (
    <Routes>
      <Route path="/" element={<RootPage />}></Route>
      {administration_routes}
      {categories_routes}
      {article_routes}
      {article_routes}
      {pill_routes}
      {main_routes}

    </Routes>
  );
}
