import React from 'react';
import { useHistory } from 'react-router-dom';

const GameCard = ({ game }) => {

  const history = useHistory();
  const { id, genres, studios, platforms,  publishers, releaseDate, title, coverImage } = game || {}

  return (
    <div className="h-80 rounded border border-avocado-400 flex flex-col" onClick={() => history.push('/games/' + id)}>
        <div className="bg-gray-100 w-full h-32 rounded-t flex-grow">
            {
                coverImage &&
                <img src={process.env.REACT_APP_API_URL + 'games/covers/' + coverImage}
                 className="w-full h-full object-cover rounded-t"
                 alt=""/>
            }
        </div>
      <div className="bg-avocado-400 py-3 h-2/6 flex flex-col justify-between align-items">

        <p className="text-center text-xs">
            { studios.map(studio  =>
            <span className="px-3 py-1 rounded-full bg-green-400 mx-1">{ studio.name }</span>
            )}
        </p>
        <div className="flex flex-grow justify-center items-center">
          <span className="text-center text-avocado-800 text-lg">{ title }</span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
