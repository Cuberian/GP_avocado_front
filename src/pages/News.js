import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {getAll} from "../http/newsAPI";

const News = observer(() => {

    const {user} = useContext(Context)
    const history = useHistory();
    const [selectedSection, setSelectedSection] = useState('Все')

    const [news, setNews] = useState([])

    useEffect(() => {
        getAll().then(r => {
            setNews(r)
        })
    }, [])

    const categories = [{name: 'Все', filter: ''}, {name: 'PC', filter: 'PC'},{name: 'Xbox One', filter: 'Xbox One'},
        {name: 'XBOX SERIES X|S', filter: 'Xbox Series X|S'},{name: 'PLAYSTATION 4', filter: 'Playstation 4'},
        {name: 'Playstation 5', filter: 'Playstation 5'}, {name: 'Nintendo Switch', filter: 'Nintendo Switch'},
        {name: 'MMO', filter: 'mmo'}, {name: 'ИНДУСТРИЯ', filter: 'индустрия'},
        {name: 'Киберспорт', filter: 'Киберспорт'}]

    return (
        <div className="flex-grow py-10">
            <div className='max-w-5xl mx-auto bg-white flex min-h-44'>
                <div className="w-1/5 bg-specialGray-600 bg-opacity-50 text-white py-3 flex flex-col font-pressStart">
                    <p className="text-center pb-4">Категории</p>
                    {categories.map(item =>
                        <span key={'category_' + item.name} className={`py-3 px-4 
                        ${selectedSection === item.name ? 
                            'bg-avocado-400 text-avocado-800' : 'hover:bg-avocado-400 hover:text-avocado-800'} 
                            w-full uppercase text-xs`}
                            onClick={() => setSelectedSection(item.name)}>{ item.name }</span>
                    )}

                </div>
                <div className="flex-grow py-2 space-y-4">
                    <div className="flex items-center px-3">
                        <span className="font-pressStart text-2xl flex-grow text-center">Игровые новости</span>
                        {user.isAuth &&
                        <button
                            className="px-2 py-2 w-min flex items-center justify-center rounded-md bg-avocado-400"
                            onClick={() => history.push('/create/news')}>
                            <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                            </svg>
                        </button>
                        }
                    </div>
                    <div className="px-3">
                        {news && news.map(item =>
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
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default News;
