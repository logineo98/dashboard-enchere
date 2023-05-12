import Dashboard from "./dashboard/Dashboard";
import Setting from "./setting/Setting";

import Articles from "./articles/Articles";
import Clients from "./clients/Clients";
import Utilisateurs from "./utilisateurs/Utilisateurs";
import NouveauClient from "./clients/sub/NouveauClient";
import EditionClients from "./clients/sub/EditionClients";
import ClientsPrives from "./clients/sub/ClientsPrives";
import ClientsPublics from "./clients/sub/ClientsPublics";
import EditionUtilisateur from "./utilisateurs/sub/EditionUtilisateur";
import NouvelUtilisateur from "./utilisateurs/sub/NouvelUtilisateur";
import NouvelArticles from "./articles/sub/NouvelArticles";
import EditionArticles from "./articles/sub/EditionArticles";
import ArticlesPrivee from "./articles/sub/ArticlesPrivee";
import ArticlesPublics from "./articles/sub/ArticlesPublics";
import Login from "./auth/Login";
import DisplayArticle from "./articles/sub/DisplayArticle";
import DisplayClient from "./clients/sub/DisplayClient";
import VitepaySuccess from "./vitepay/VitepaySuccess";
import VitepayCancel from "./vitepay/VitepayCancel";
import VitepayDecline from "./vitepay/VitepayDecline";
import ProfileUtilisateur from "./utilisateurs/sub/ProfileUtilisateur";
import RejectArticle from "./articles/sub/RejectArticle";


export {
    Dashboard,
    Articles, NouvelArticles, EditionArticles, ArticlesPrivee, ArticlesPublics, DisplayArticle,
    Clients, NouveauClient, EditionClients, ClientsPrives, ClientsPublics,
    Utilisateurs, EditionUtilisateur, NouvelUtilisateur,
    Setting, Login, DisplayClient, VitepaySuccess, VitepayCancel, VitepayDecline, ProfileUtilisateur, RejectArticle

}

