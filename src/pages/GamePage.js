import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {getById} from "../http/gamesAPI";
import moment from "moment";
import 'moment/locale/ru'

const GamePage = () => {
    const { id } = useParams()
    const history = useHistory();
    const [game, setGame] = useState()

    useEffect(async () => {
        const loadedGame = await getById(id)
        console.log(loadedGame)
        setGame(loadedGame)
    },  [])


    return (
        <div className="flex-grow w-full py-10">
            {
                game &&
                <div className="rounded-md bg-white max-w-5xl mx-auto p-5 min-w-64 space-y-5">
                    <div className="flex justify-between">
                        <div className="flex space-x-2 items-center">
                            <p className="font-pressStart text-xl">{game.title}</p>
                            <div className="px-3 py-2 bg-avocado-400 rounded font-pressStart text-white">
                                {game.rating ?? 'Нет оценок'}
                            </div>
                        </div>
                        <button
                            className="px-3 py-2 bg-avocado-400 text-avocado-800 font-pressStart rounded"
                            onClick={() => history.push('/update/games/' + id)}>
                            Обновить
                        </button>
                    </div>

                    <div className="w-full flex justify-between">
                        <div className="flex-grow space-y-4">
                            <p className="font-pressStart">
                                Платформа: {
                                game.platforms.map( platform => <span className="text-avocado-400"> { platform.title } </span>)
                            }
                            </p>
                            <p className="font-pressStart">
                                Жанр: {
                                game.genres.map( genre => <span className="text-avocado-400"> { genre.value } </span>)
                            }
                            </p>
                            <p className="font-pressStart">
                                Дата выхода: <span className="text-avocado-400">  { game.releaseDate.toString().split('T')[0] } </span>
                            </p>
                            <p className="font-pressStart">
                                Разработчики: {
                                game.studios.map( studio => <span className="text-avocado-400"> { studio.name } </span>)
                            }
                            </p>
                            <p className="font-pressStart">
                                Издатели: {
                                game.publishers.map( publisher => <span className="text-avocado-400"> { publisher.name } </span>)
                            }
                            </p>
                        </div>

                        <div className="w-60 h-72 bg-gray-500 rounded-md">
                            { game.coverImage &&
                            <img src={process.env.REACT_APP_API_URL + 'games/covers/' + game.coverImage}
                                 className="w-full h-full object-cover rounded-md"
                                 alt=""/>
                            }
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}

export default GamePage;
