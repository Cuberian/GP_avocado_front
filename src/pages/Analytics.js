import React, {Fragment, useEffect, useState} from 'react';
import ReactToExcel from "react-html-table-to-excel"

import { Chart as ChartJS,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';
import {getAllGames, getAllGenres} from "../http/gamesAPI";

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Analytics =() => {

    const [firstChartData, setFirstChartData] = useState()

    const secondChartData = {
        labels: ['Январь', 'Февраль', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август'],
        datasets: [
            {
                label: 'Количество релизов',
                data: [12, 23, 9, 30, 45, 6, 15],
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            }
        ],
    };

    useEffect(async () => {
        const games = await getAllGames()

        const genres = await getAllGenres()

        const  firstData = genres.map(genre => {
            const genreGames = games.filter(game => game.genres.find(gameGenre => gameGenre.value === genre.value))
            if(genreGames.length > 0)
                return {'genre': genre.value, 'count': genreGames.length}
        }).filter(item => item)


        const result = {
            labels: firstData.slice(0, 5).map(item => item.genre),
            datasets: [
                {
                    label: '# of Votes',
                    data: firstData.slice(0, 5).map(item => item.count),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(30, 100, 86, 0.2)',
                        'rgba(100, 200, 150, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132,  1)',
                        'rgba(54, 162, 235,  1)',
                        'rgba(255, 205, 86,  1)',
                        'rgba(30, 100, 86,  1)',
                        'rgba(100, 200, 150,  1)',
                    ],
                    borderWidth: 1,
                },
            ],
        }
        console.log(result)
        setFirstChartData(result)

    }, [])

    return (
        <div className="flex-grow py-10">
            <div className='max-w-5xl mx-auto bg-white flex flex-col items-center min-h-2/4 py-5 space-y-6'>
                {firstChartData &&
                    <div className="w-1/2 flex flex-col items-center space-y-3">
                        <p className="text-2xl">Популярные жанры</p>
                        <Pie data={firstChartData}/>

                        <table id="topGenres" className="min-w-1/2 hidden">
                            <thead className="">
                            <tr className="">
                                <th  className="p-3"/>
                                {firstChartData.labels.map(item => <td className="p-3 border-2 bg-yellow">{item}</td>)}
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <th  className="p-3"/>
                                {firstChartData.datasets[0].data.map(item =><td> {item} </td>)}
                            </tr>
                            </tbody>
                        </table>
                        <ReactToExcel
                            className="px-3 py-2 bg-avocado-400 text-avocado-800 rounded font-pressStart"
                            table="topGenres"
                            filename={'TopGenres'}
                            sheet="sheet1"
                            buttonText="Экспорт в Excel"
                        />
                    </div>
                }
                <hr className="bg-avocado-400 w-4/5"/>
                <div className="w-1/2 flex flex-col items-center space-y-3">
                    <p className="text-2xl">Кооличество релизов игр по месяцам</p>
                    <Line data={ secondChartData }/>
                    <button className="px-3 py-2 bg-avocado-400 text-avocado-800 rounded font-pressStart">Экспорт в Excel</button>
                </div>
            </div>
        </div>
    );
}

export default Analytics;
