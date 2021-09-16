import React, {useContext} from 'react';
import {useLocation, useHistory, NavLink} from 'react-router-dom'
import {useForm} from "react-hook-form";
import {LOGIN_ROUTE, EMAIL_REGEX, REGISTRATION_ROUTE, MAIN_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const Auth = observer(() => {

    const {user} = useContext(Context)
    const location = useLocation();
    const history = useHistory();
    const {register, handleSubmit, formState: { errors }} = useForm();

    const isLogin = location.pathname === LOGIN_ROUTE;

    const signIn = async ({email, nickname, password}) => {
        try {
            let userData = null
            if (isLogin) {
                userData = await login(email, password)
            } else {
                userData = await registration(email, nickname, password)
            }

            user.setUser(userData)
            user.setIsAuth(true)

            console.log(userData)

            history.push(MAIN_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <div className="w-full py-10">
           <div className="max-w-4xl mx-auto">
               <div className="rounded-md bg-white flex flex-col space-y-4 px-5 py-10 w-3/5 mx-auto">
                   <p className="font-pressStart text-center text-2xl">{ isLogin ? 'Авторизация' : 'Регистрация' }</p>
                   <form action="" onSubmit={handleSubmit(signIn)} className="space-y-4">
                        <div className="flex flex-col">
                            <span className="text-lg font-pressStart ">Почта</span>
                            <input className="border-b-2 border-black pt-1 text-lg focus:outline-none"
                                   type="text"
                                   {...register('email', {
                                       required: "Укажите почту",
                                       pattern: {value: EMAIL_REGEX, message:"Почта не может быть пустой"}
                                   })}
                            />
                            { errors.email && <p className="text-red-500"> { errors.email.message } </p> }
                        </div>
                       {
                           !isLogin &&
                           <div className="flex flex-col">
                               <span className="text-lg font-pressStart">Никнейм</span>
                               <input className="border-b-2 border-black pt-1 text-lg focus:outline-none" type="text"
                                      { ...register('nickname', { required: "Укажите никнейм" }) }
                               />
                               { errors.nickname && <p className="text-red-500"> { errors.nickname.message } </p> }
                           </div>
                       }
                       <div className="flex flex-col">
                           <span className="text-lg font-pressStart ">Пароль</span>
                           <input className="border-b-2 border-black pt-1 text-lg focus:outline-none" type="password"
                                  { ...register('password', { required: "Укажите пароль" }) }
                           />
                           { errors.password && <p className="text-red-500"> { errors.password.message } </p> }
                       </div>
                       <div className="flex justify-center">
                           <button className="px-3 py-2 bg-specialGray-600 text-white font-pressStart rounded-md focus:outline-none">{ isLogin ? 'Войти' : 'Зарегистрироваться' }</button>
                       </div>
                    </form>
               </div>
               <div className="w-3/5 mx-auto flex justify-center py-3">
                   {isLogin ?
                   <span className="mx-auto text-center">Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} className="text-white hover:text-avocado-800">Зарегистрируйся!</NavLink></span> :
                       <span className="mx-auto text-center">Есть аккаунт? <NavLink to={LOGIN_ROUTE} className="text-white hover:text-avocado-800">Войди!</NavLink></span>}
               </div>
           </div>
        </div>
    );
});

export default Auth;
