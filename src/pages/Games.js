import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {getAll} from "../http/newsAPI";
import NewsCard from "../components/NewsCard";

const Games = observer(() => {

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
                        <span className="font-pressStart text-2xl flex-grow text-center">Игры</span>
                        {
                            user.isAuth &&
                            <button
                                className="px-2 py-2 w-min flex items-center justify-center rounded-md bg-avocado-400"
                                onClick={() => history.push('/create/games')}>
                                <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                            </button>
                        }
                    </div>
                    <div className="px-3">
                        {news && news.map(item =>
                            <NewsCard article={item} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
});

export default Games;
