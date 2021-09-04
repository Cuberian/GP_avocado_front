import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import MainPage from "./pages/MainPage";
import NewsPage from "./pages/NewsPage";
import GamePage from "./pages/GamePage";
import Auth from "./pages/Auth";
import News from "./pages/News";
import Games from "./pages/Games";

import {
    ADMIN_ROUTE, CREATE_NEWS_ROUTE,
    GAMES_ROUTE,
    LOGIN_ROUTE,
    MAIN_ROUTE,
    NEWS_ROUTE,
    PROFILE_ROUTE,
    REGISTRATION_ROUTE, UPDATE_NEWS_ROUTE
} from "./utils/consts";
import CreateUpdateNews from "./pages/CreateUpdateNews";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: CREATE_NEWS_ROUTE,
        Component: CreateUpdateNews
    },
    {
        path: UPDATE_NEWS_ROUTE + '/:id',
        Component: CreateUpdateNews
    }
]

export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: MainPage
    },
    {
        path: NEWS_ROUTE + '/:id',
        Component: NewsPage
    },
    {
        path: GAMES_ROUTE + '/:id',
        Component: GamePage
    },
    {
        path: NEWS_ROUTE,
        Component: News
    },
    {
        path: GAMES_ROUTE,
        Component: Games
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
