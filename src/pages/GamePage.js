import React, {Fragment, useContext, useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {getById} from "../http/gamesAPI";
import { Popover } from '@headlessui/react'
import moment from "moment";
import 'moment/locale/ru'
import {createRating, getGameRatings, updateRating} from "../http/ratingAPI";
import {Context} from "../index";

const GamePage = () => {
    const { id } = useParams()
    const {user} = useContext(Context);
    const history = useHistory();
    const [game, setGame] = useState()
    const [userScore, setUserScore] = useState(null)
    const [gameRatings, setGameRatings] = useState([])
    const [score, setScore] = useState(0)

    useEffect(async () => {
        const loadedGame = await getById(id)
        console.log(loadedGame)
        setGame(loadedGame)

        const loadedRatings = await getGameRatings(id)
        console.log('ratings', loadedRatings)
        setGameRatings(loadedRatings.map(rating =>  rating.rating))
        if(user.isAuth) {
            setUserScore(loadedRatings.find(rating => rating.user_id === user.user.id).rating)
            setScore(loadedRatings.find(rating => rating.user_id === user.user.id).rating)
        }
    },  [user])

    const changeScore = ( value ) => {
        const updatedScore = score + value
        if(updatedScore >=  0 && updatedScore <= 10)
            setScore(updatedScore)
    }

    const makeGameScore = () => {
        return (gameRatings.reduce((previousValue, currentValue) => previousValue + currentValue)/( gameRatings.length * 10)) * 10
    }

    return (
        <div className="flex-grow w-full py-10">
            {
                game &&
                <div className="rounded-md bg-white max-w-5xl mx-auto p-5 min-w-64 space-y-5">
                    <div className="flex justify-between">
                        <div className="flex space-x-2 items-center">
                            <p className="font-pressStart text-xl">{game.title}</p>
                            <div className="px-3 py-2 bg-avocado-400 rounded font-pressStart text-white">
                                {gameRatings.length > 0 ? makeGameScore() : 'Нет оценок'}
                            </div>
                            <Popover className="relative">
                                <Popover.Button
                                    className="px-3 py-2 bg-avocado-400 rounded font-pressStart text-white flex items-center">
                                    <span className="">Твоя оценка: { userScore }</span>
                                </Popover.Button>

                                <Popover.Panel className="absolute z-10 bg-white w-60 my-3 p-2 rounded shadow">
                                    {({ close }) => (
                                        <div className="space-y-3 flex flex-col justify-center">
                                            <div className="font-pressStart text-center flex items-center space-x-4 justify-center">
                                                <div className="flex items-center">
                                                    <button
                                                        className="p-1 bg-avocado-400 rounded"
                                                        onClick={() => changeScore(-1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                                        </svg>
                                                    </button>
                                                    <span className="px-4">
                                                        { score }
                                                    </span>
                                                    <button
                                                        className="p-1 bg-avocado-400 rounded"
                                                        onClick={() => changeScore(1)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                                        </svg>
                                                    </button>
                                                </div>
                                                <span>/</span>
                                                <span>10</span>
                                            </div>
                                            <button
                                                className="px-3 py-2 bg-avocado-400 rounded font-pressStart"
                                                onClick={async () => {
                                                    let userRating = null
                                                    if(!userScore)
                                                        userRating = await createRating(score, id, user.user.id)
                                                    else
                                                        userRating = await updateRating(score, id, user.user.id)
                                                    setUserScore(userRating.rating)
                                                    close()
                                                }}
                                            >
                                                Оценить
                                            </button>
                                        </div>
                                    )}
                                </Popover.Panel>
                            </Popover>
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
