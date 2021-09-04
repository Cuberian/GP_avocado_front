import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './style/main.css'
import {createContext} from "react";
import UserStore from "./store/UserStore";

export const Context = createContext(null)

ReactDOM.render(
    <Context.Provider value={{
        user: new UserStore()
    }}>
        <App />
    </Context.Provider>,
  document.getElementById('root')
);
