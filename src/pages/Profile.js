import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {deleteById, getAll} from "../http/newsAPI";
import NewsCard from "../components/NewsCard";
import {EMAIL_REGEX, LOGIN_ROUTE} from "../utils/consts";
import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";

const Profile = observer(() => {

    const {user} = useContext(Context)
    const {register, handleSubmit, formState: { errors }, setValue} = useForm();
    const [updateMode, setUpdateMode]= useState(false)
    const history = useHistory();

    useEffect(() => {
        setValue('nickname', user.user.nickname)
        setValue('email', user.user.email)
        setValue('password', user.user.password)
    }, [])

    const updateProfile = async (data) => {
        setUpdateMode(false)
        history.push(LOGIN_ROUTE)
    }


    return (
        <div className="w-full py-10 flex-grow">
            <div className="mx-auto container flex justify-center">
                <div className="lg:w-2/3 sm:w-3/4 w-full bg-white rounded-md p-5 flex flex-col space-y-10">
                    <div className="flex space-x-4 justify-center">
                        <div className="w-28 h-28 bg-gray-500 rounded">

                        </div>
                        <div className="flex flex-col justify-between">
                            <div className="flex flex-col py-2">
                                <span className="font-pressStart text-2xl">{ user && user.user.nickname }</span>
                                <span className="font-pressStart text-xs text-avocado-400">{user && user.user.role.value}</span>
                            </div>
                            <button
                                className={`px-3 py-2 w-32 flex items-center justify-center rounded-md ${updateMode ? 'bg-red-400' : 'bg-avocado-400'}`}
                                onClick={() => setUpdateMode(!updateMode)}>
                                {updateMode ?
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-avocado-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    :
                                    <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20"
                                         xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd"
                                              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                              clipRule="evenodd"/>
                                    </svg>
                                }
                            </button>
                        </div>
                    </div>
                    {
                        updateMode &&
                        <div className="flex flex-col space-y-5 w-1/2 mx-auto border border-avocado-400 p-3 rounded">
                        <form action="" onSubmit={handleSubmit(updateProfile)} className="space-y-4">
                            <div className="flex flex-col">
                                <span className="text-lg font-pressStart ">Почта</span>
                                <input className="border-b-2 border-black pt-1 text-lg focus:outline-none"
                                       type="text"
                                       {...register('email', {
                                           pattern: {value: EMAIL_REGEX, message: "Почта не может быть пустой"}
                                       })}
                                />
                                {errors.email && <p className="text-red-500"> {errors.email.message} </p>}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-pressStart">Никнейм</span>
                                <input className="border-b-2 border-black pt-1 text-lg focus:outline-none" type="text"
                                       {...register('nickname')}
                                />
                                {errors.nickname && <p className="text-red-500"> {errors.nickname.message} </p>}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-pressStart ">Новый пароль</span>
                                <input className="border-b-2 border-black pt-1 text-lg focus:outline-none"
                                       type="password"
                                       {...register('password')}
                                />
                                {errors.password && <p className="text-red-500"> {errors.password.message} </p>}
                            </div>
                            <div className="flex justify-center">
                                <button
                                    className="px-3 py-2 bg-specialGray-600 text-white font-pressStart rounded-md focus:outline-none">{'Обновить профиль'}</button>
                            </div>
                        </form>
                    </div>
                    }
                </div>
            </div>
        </div>
    );
});

export default Profile;
