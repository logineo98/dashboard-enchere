import { NouvelArticleForms } from "../libs";
import { handleChangeCheck } from "../libs/js/fonctions";
import DisplayClientBody from "./clients/DisplayClientBody";
import EditCientForms from "./clients/EditCientForms";
import NouveauCientForms from "./clients/NouveauCientForms";
import { Card, } from "./commons";
import Loading from "./commons/Loading";
import PageTableHeader from "./commons/PageTableHeader";
import DisplayArticleBody from "./enchere/DisplayArticleBody";
import EditArticleForms from "./enchere/EditArticleForms";
import RejectMotifs from "./enchere/RejectMotifs";
import Content from "./main/Content";
import Navbar from "./main/Navbar";
import Sidebar from "./main/Sidebar";
import EditUtilisateurForms from "./utilisateur/EditUtilisateurForms";
import NouvelUtilisateurForms from "./utilisateur/NouvelUtilisateurForms";
import ProfileDisplay from "./utilisateur/ProfileDisplay";

export {
    Content, Sidebar, Navbar, PageTableHeader,
    DisplayArticleBody,
    Card, Loading, EditArticleForms, NouvelArticleForms, NouveauCientForms, EditCientForms,
    DisplayClientBody, ProfileDisplay, NouvelUtilisateurForms, EditUtilisateurForms, RejectMotifs,
    handleChangeCheck,
}