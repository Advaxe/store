
import {
          createRoutesFromElements,
          Route,
          Routes
        } from "react-router-dom";
import ProductsPage from "../../pages/products/ProductsPage";
import NewProductPage from "../../pages/products/NewProductPage";

export default [
          <Route path="products" Component={ProductsPage} key={"products_list"} />,
          <Route path="products/new_product" Component={NewProductPage} key={"new_product"} />
]