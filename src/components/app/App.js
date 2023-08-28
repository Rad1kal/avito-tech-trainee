import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import MainPage from '../mainPage/MainPage';
import GamePage from '../gamePage/GamePage';
import {useEffect, useState} from 'react';
import GetServerData from '../../services/getServerData';

function App() {
  const server = new GetServerData();
  const [cards, setCards] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    server.getGames()
    .then(games=>setCards(games))
    .catch(()=>setError(true));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage cards={cards} error={error}/>} />
        <Route path="/card/:cardId" element={<GamePage cards={cards} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
