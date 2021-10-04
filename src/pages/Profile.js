import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {deleteById, getAll} from "../http/newsAPI";
import NewsCard from "../components/NewsCard";

const Profile = observer(() => {

    const {user} = useContext(Context)

    const [news, setNews] = useState([])

    useEffect(() => {
        getAll().then(r => {
            setNews(r)
        })
    }, [])

    const deleteNews = async (id) => {
        await deleteById(id)
        getAll().then(r => {
            setNews(r)
        })
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
                            <button className="px-3 py-2 w-32 flex items-center justify-center rounded-md bg-avocado-400">
                                <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" /></svg>
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-5">
                        <div className="flex justify-center font-pressStart">
                            <div className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Новости</div>
                            <div className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Игры</div>
                            <div className="px-3 py-2 bg-specialGray-600 text-white hover:bg-avocado-400 hover:text-avocado-800">Комментарии</div>
                        </div>
                        <div>
                            { news && news.map(item =>
                                <NewsCard article={item} deleteNews={(id) => deleteNews(id)}/>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Profile;
