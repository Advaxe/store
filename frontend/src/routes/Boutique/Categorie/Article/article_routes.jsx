import { Route } from "react-router-dom";
import AddPageArticle from "../../../../pages/Boutique/Articles/AddPageArticle";
import EditPageArticle from "../../../../pages/Boutique/Articles/EditPageArticle";
import ListPageArticle from "../../../../pages/Boutique/Articles/ListPageArticle";

export const articles_routes_items={
    articles : {
        path: "article",
        name: "Articles",
        component: ListPageArticle
    },
    add_articles : {
        path: "article/add",
        name: "Nouveau article",
        component: AddPageArticle
    },
    edit_articles : {
        path: "article/edit/:ID_ARTICLE",
        name: "Modifier article",
        component: EditPageArticle
    }
}

var article_routes = []

for (let key in articles_routes_items){

    const route = articles_routes_items[key]
    article_routes.push(<Route path={route.path} Component={route.component} key={route.path}/>)

}

export default article_routes