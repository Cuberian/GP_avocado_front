import React from 'react';
import { Chart as ChartJS,
    ArcElement,
    Tooltip,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend } from 'chart.js';
import { Pie, Line } from 'react-chartjs-2';

ChartJS.register(ArcElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const Analytics =() => {

    const firstChartData = {
        labels: ['Action RPG', 'RPG', 'Simulator', 'Shooter', 'FPS Shooter', 'MMO'],
        datasets: [
            {
                label: '# of Votes',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

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

    return (
        <div className="flex-grow py-10">
            <div className='max-w-5xl mx-auto bg-white flex flex-col items-center min-h-2/4 py-5 space-y-6'>
                <div className="w-1/2 flex flex-col items-center space-y-3">
                    <p className="text-2xl">Популярные жанры</p>
                    <Pie data={firstChartData}/>
                    <button className="px-3 py-2 bg-avocado-400 text-avocado-800 rounded font-pressStart">Экспорт в Excel</button>
                </div>
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
