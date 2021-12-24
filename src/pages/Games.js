import React, {useContext, useEffect, useState} from 'react';
import GameCard from '../components/GameCard';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {useHistory} from "react-router-dom";
import {getAllGames, getAllPlatforms} from "../http/gamesAPI";

const Games = observer(() => {

  const { user } = useContext(Context)
  const history = useHistory();
  const [sections, setSections] = useState([])
  const [selectedSection, setSelectedSection] = useState(-1)
  const [games, setGames] = useState([])

  useEffect(async ()   => {
    const data = await getAllGames()
    const platforms = await getAllPlatforms()
    setSections([{id: -1, title: 'Все'}, ...platforms])
    console.log(data)
    setGames(data)
  }, [])

  const changeSection = (id) => {
    setSelectedSection(id)
  }

  const filteringContent = () => {
    if (selectedSection && selectedSection > -1)
    {
      return games.filter(game => game.platforms.find( platform=> platform.id === selectedSection))
    }
    return  games
  };

  return (
    <div className="flex-grow py-10">
      <div className='max-w-5xl mx-auto bg-white flex flex-grow min-h-44'>
        <div className="w-60 bg-specialGray-600 bg-opacity-50 text-white py-3 flex flex-col font-pressStart">
          <p className="text-center pb-4">Категории</p>
          {sections.length > 0 && sections.map(item =>
            <span key={'category_' + item.id} className={`py-3 px-4 
                        ${selectedSection === item.id ?
              'bg-avocado-400 text-avocado-800' : 'hover:bg-avocado-400 hover:text-avocado-800'} 
                            w-full uppercase text-xs`}
                  onClick={() => changeSection(item.id)}>{item.title}</span>
          )}

        </div>
        <div className="flex-1 py-2 space-y-4">
          <div className="flex items-center px-3">
            <span className="font-pressStart text-2xl flex-grow text-center">Игры</span>
            {user.isAuth &&
            <button
              className="px-2 py-2 w-min flex items-center justify-center rounded-md bg-avocado-400"
              onClick={() => history.push('/create/games')}>
              <svg className="w-6 h-6 text-avocado-800" fill="currentColor" viewBox="0 0 20 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                      clipRule="evenodd" />
              </svg>
            </button>
            }
          </div>
          <div className="px-3 grid grid-cols-4 gap-4">
            {
              games.length > 0 && filteringContent().map(game => {
                return <GameCard key={`game_${game.id}`} game={game} />
              })
            }
          </div>
          {
            filteringContent().length === 0 && <p className="font-pressStart text-center">Игры не найдены</p>
          }
        </div>
      </div>
    </div>
  );
})

export default Games;
