import React, {useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {getById} from "../http/newsAPI";
import moment from "moment";
import 'moment/locale/ru'
import {deleteById} from "../http/newsAPI";
import {Context} from "../index";

const NewsPage = () => {

    const {id} = useParams()
    const {user} = useContext(Context);
    const [news, setNews] = useState()
    const history = useHistory();

    useEffect(() => {
        getById(id).then(r => {
            console.log(r)
            setNews(r)
        })
    }, [])

    const transformToHTML = (text) => {
        return {__html: text}
    }

    const deleteNews = async () => {
        await deleteById(id)
        history.push('/news')
    }

    return (
        <div className="flex-grow w-full py-10">
            {news &&
                <div className="rounded-md bg-white max-w-5xl mx-auto p-5 min-w-64 space-y-5">
                    <div className="flex justify-between items-center">
                    <p className="font-pressStart text-xl">{news.header}</p>
                        {user.isAuth &&
                        <div className="flex  space-x-2">
                            <button
                                className="px-3 py-2 bg-avocado-400 text-avocado-800 font-pressStart rounded"
                                onClick={() => history.push('/update/news/' + id)}>
                                Обновить
                            </button>
                            <button
                                className="bg-red-400 py-1 px-2 rounded flex items-center justify-center"
                                onClick={deleteNews}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                            </button>
                        </div>
                        }
                    </div>
                    <div className="flex space-x-5 items-center justify-start">
                        <div className="flex justify-center items-center w-min space-x-2">
                            <div className="bg-gray-500 w-8 h-8 rounded-md">
                            </div>
                            <span className="font-pressStart">{ news.author.nickname }</span>
                        </div>
                        <span className="font-play">{ moment(news.createdAt).format('DD.MM.YYYY') }</span>
                        <div className="flex space-x-1 items-center justify-center font-play">
                            <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                            <span className="text-avocado-800">0</span>
                        </div>
                        <div className="flex space-x-1 items-center justify-center font-play">
                            <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                            <span className="text-avocado-800">1</span>
                        </div>
                    </div>
                    <div dangerouslySetInnerHTML={transformToHTML(news.text)} className=" landing-6 space-y-4 font-play"/>
                    <div className="flex space-x-4">
                        {news.tags && news.tags.length > 0 && news.tags.map(item =>
                            <span className="font-play hover:text-avocado-400 text-xs ">
                                {item.value}
                            </span>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}

export default NewsPage;
