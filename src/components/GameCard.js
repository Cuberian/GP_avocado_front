import React from 'react';
import { useHistory } from 'react-router-dom';

const GameCard = ({ game }) => {

  const history = useHistory();
  const { gameId, label, studio } = game || {}

  return (
    <div className="h-80 rounded border border-avocado-400 flex flex-col" onClick={() => history.push('/games/' + gameId)}>
      <div className="bg-gray-100 w-full rounded-t flex-grow"/>
      <div className="bg-avocado-400 py-3 h-2/6 flex flex-col justify-between align-items">

        <p className="text-center text-xs"> <span className="px-3 py-1 rounded-full bg-green-400">{ studio }</span></p>
        <div className="flex flex-grow justify-center items-center">
          <span className="text-center text-avocado-800 text-lg">{ label }</span>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
