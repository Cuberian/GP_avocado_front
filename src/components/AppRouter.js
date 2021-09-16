import React, {useContext} from 'react';
import {Switch, Route, Redirect} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {authRoutes, publicRoutes} from "../routes";
import {MAIN_ROUTE} from "../utils/consts";
import {Context} from "../index";


const AppRouter = observer(() => {

    const {user} = useContext(Context)
    console.log(user)

    return (
        <Switch>
            {
                user.isAuth && authRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact />
                )
            }
            {
                publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} component={Component} exact />
                )
            }
            <Redirect to={MAIN_ROUTE}/>
        </Switch>
    );
});

export default AppRouter;
