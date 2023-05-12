import Login from "../../pages/auth/Login"
import { Articles, ArticlesPrivee, ArticlesPublics, Clients, ClientsPrives, ClientsPublics, Dashboard, DisplayArticle, DisplayClient, EditionArticles, EditionClients, EditionUtilisateur, NouveauClient, NouvelArticles, NouvelUtilisateur, ProfileUtilisateur, RejectArticle, Setting, Utilisateurs, } from "../../pages"

const routes = [
    { path: '/', exact: true, name: 'Login', element: Login },
    { path: '/dashboard', name: 'Tableau de bord', element: Dashboard },

    { path: '/articles', name: 'Articles', element: Articles, exact: true },
    { path: '/articles/nouvel-article', name: 'Nouvel article', element: NouvelArticles },
    { path: '/articles/edition-article/:id', name: 'Edition article', element: EditionArticles },
    { path: '/articles/details-article/:id', name: 'Details article', element: DisplayArticle },
    { path: '/articles/rejeter-article/:id', name: 'Rejeter l\'article', element: RejectArticle },
    { path: '/articles/articles-publics', name: 'Articles publics', element: ArticlesPublics },
    { path: '/articles/articles-prives', name: 'Articles privés', element: ArticlesPrivee },


    { path: '/clients', name: 'Clients', element: Clients, exact: true },
    { path: '/clients/nouveau-client', name: 'Nouveau client', element: NouveauClient },
    { path: '/clients/edition-client/:id', name: 'Edition client', element: EditionClients },
    { path: '/clients/details-client/:id', name: 'Details client', element: DisplayClient },
    { path: '/clients/clients-publics', name: 'Clients publics', element: ClientsPublics },
    { path: '/clients/clients-vip', name: 'Clients VIP', element: ClientsPrives },

    { path: '/administrateurs', name: 'Utilisateurs', element: Utilisateurs, exact: true },
    { path: '/administrateurs/nouvel-administrateur', name: 'Nouvel administrateur', element: NouvelUtilisateur },
    { path: '/administrateurs/edition-administrateur/:id', name: 'Edition administrateur', element: EditionUtilisateur },
    { path: '/administrateurs/profile-administrateur/:id', name: 'Paramètres', element: ProfileUtilisateur, exact: true },

    { path: '/parametres', name: 'Paramètres', element: Setting, exact: true },



    // { path: '/vitepay-success', name: 'Success', element: VitepaySuccess, exact: true },
    // { path: '/vitepay-cancel', name: 'Success', element: VitepayCancel, exact: true },
    // { path: '/vitepay-decline', name: 'Success', element: VitepayDecline, exact: true },

]

export default routes