import React from 'react';
import {deleteById, getAll} from "../http/newsAPI";
import {useHistory} from "react-router-dom";

const NewsCard = ({ article, deleteNews }) => {

    const history = useHistory();

    return (
        <div key={'news_'+article.id} className="bg-avocado-400 rounded-md flex p-3 space-x-5">
            <div className="w-40 h-32 bg-gray-500 rounded-md">
                { article.coverImage &&
                <img src={process.env.REACT_APP_API_URL + 'news/covers/' + article.coverImage}
                     className="w-full h-full object-cover rounded-md"
                     alt=""/>
                }
            </div>
            <div className="flex flex-col justify-between py-3">
                <p className="font-pressStart text-avocado-800" onClick={() => history.push('/news/'+ article.id)}>{article.header}</p>
                <div className="flex space-x-4">
                    <div className="flex space-x-1 items-center justify-center">
                        <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" /></svg>
                        <span className="text-avocado-800">0</span>
                    </div>
                    <div className="flex space-x-1 items-center justify-center">
                        <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" /></svg>
                        <span className="text-avocado-800">1</span>
                    </div>
                    <button onClick={() => deleteNews(article.id)}>
                        <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NewsCard;
