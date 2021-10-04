import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getById} from "../http/newsAPI";
import moment from "moment";
import 'moment/locale/ru'

const GamePage = () => {

  const { id } = useParams()
  const [game, setGame] = useState(
    {
      label: 'Persona 2: Innocent Sin',
      studio: 'ATLUS', publisher: 'ATLUS',
      gameId: id,
      release_date: '20.09.2021',
      genres: ['platformer', 'action adventure'],
    })



  return (
    <div className="flex-grow w-full py-10">
      {game &&
      <div className="rounded-md bg-white max-w-5xl mx-auto p-5 min-w-64 space-y-5">

      </div>
      }
    </div>
  );
}

export default GamePage;
