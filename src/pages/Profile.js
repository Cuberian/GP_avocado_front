import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {deleteById, getAll} from "../http/newsAPI";
import {useHistory} from "react-router-dom";

const Profile = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory();

    const [news, setNews] = useState([])

    useEffect(() => {
        getAll().then(r => {
            setNews(r)
        })
    }, [])

    const deleteNews = async (id) => {
        const data = await deleteById(id)
        getAll().then(r => {
            setNews(r)
        })
    }

    return (
        <div className="w-full py-10 flex-grow">
            <div className="mx-auto container flex justify-center">
                <div className="w-1/2 bg-white rounded-md p-5 flex flex-col space-y-10">
                    <div className="flex space-x-4">
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
                                <div key={'news_'+item.id} className="bg-avocado-400 rounded-md flex p-3 space-x-5">
                                    <div className="w-40 h-32 bg-gray-500 rounded-md">
                                        { item.coverImage &&
                                        <img src={process.env.REACT_APP_API_URL + 'news/covers/' + item.coverImage}
                                             className="w-full h-full object-cover rounded-md"
                                             alt=""/>
                                        }
                                    </div>
                                    <div className="flex flex-col justify-between py-3">
                                        <p className="font-pressStart text-avocado-800" onClick={() => history.push('/news/'+ item.id)}>{item.header}</p>
                                        <div className="flex space-x-4">
                                            <div className="flex space-x-1 items-center justify-center">
                                                <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                                                <span className="text-avocado-800">0</span>
                                            </div>
                                            <div className="flex space-x-1 items-center justify-center">
                                                <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                                                <span className="text-avocado-800">1</span>
                                            </div>
                                            <button onClick={() => deleteNews(item.id)}>
                                                <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Profile;
