import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/App.jsx'
import './style/style.scss';
import MarvelService from "./services/MarvelServices.js";
const mlService = new MarvelService();
ReactDOM.createRoot(document.getElementById('root')).render(

    <App />
)
