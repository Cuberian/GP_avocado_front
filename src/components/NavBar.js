import React, {useContext} from 'react';
import {Context} from "../index";
import {NavLink, useHistory} from "react-router-dom";

import {ANALYTICS_ROUTE, GAMES_ROUTE, LOGIN_ROUTE, MAIN_ROUTE, NEWS_ROUTE, PROFILE_ROUTE} from "../utils/consts";
import {observer} from "mobx-react-lite";

const NavBar = observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()

    const Logout = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem('token')
        history.push(LOGIN_ROUTE)
    };

    return (
        <div className="w-full flex justify-center">
            <div className="max-w-6xl flex flex-col items-center justify-center space-y-5">
                <div className="flex items-center">
                    <div className="w-36 h-36">
                        <img src="/avocado.png" alt="" className="w-full h-full object-cover"/>
                    </div>
                    <span className="font-pressStart text-4xl">AVOCADO</span>
                </div>
                <div className="flex justify-center font-pressStart">
                    <NavLink to={MAIN_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Главная</NavLink>
                    <NavLink to={NEWS_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Новости</NavLink>
                    <NavLink to={NEWS_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Статьи</NavLink>
                    <NavLink to={ANALYTICS_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Аналитика</NavLink>
                    <NavLink to={GAMES_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Игры</NavLink>
                    <NavLink to={GAMES_ROUTE} className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Поиск</NavLink>
                    {user.isAuth ?
                        (
                            <React.Fragment>
                                <NavLink to={PROFILE_ROUTE} className="px-3 py-2 bg-avocado-400 text-avocado-800">Профиль</NavLink>
                                <button onClick={Logout} className="px-3 py-2 bg-red-400 text-avocado-800">Выйти</button>
                            </React.Fragment>
                        )
                    :
                        <NavLink to={LOGIN_ROUTE} className="px-3 py-2 bg-gray-500 text-white hover:bg-avocado-400 hover:text-avocado-800">Войти</NavLink>
                    }
                </div>
            </div>
        </div>
    );
});

export default NavBar;
