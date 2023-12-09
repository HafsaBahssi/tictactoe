// App.js

import React , { useState }from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Routes, Route as Navigate } from 'react-router-dom';
import Signin from './component/auth/Signin';
import Signup from './component/auth/Signup';
import Navigation from './navigation';
import './App.css'; 
import GameModeSelection from './component/GameModeSelection';
import TicTacToe from './component/playervsplayer';
import TicTacToeVsComputer from './component/playervscomputer';
import Logout from './component/auth/logout';

const App = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [winner, setWinner] = useState(null);

  const resetGame = () => {
    // Réinitialisez l'état du tableau et du gagnant ici
    setBoard(Array(9).fill(null));
    setWinner(null);
  };
  return (
    <Router>
      <Routes>
          
           
            <Navigate path="/Signin" element={<Signin />} />
            <Navigate path="/Signin/logout" element={<Logout />} />
          <Navigate path="/Signup" element={<Signup />} />
          <Navigate path="/game-mode-selection" element={<GameModeSelection />} />
          <Navigate path="/playervsplayer" element={<TicTacToe resetGame={resetGame}/>} />
          <Navigate path="/playervscomputer" element={<TicTacToeVsComputer resetGame={resetGame}  />} />


  
      </Routes>
    </Router>
  );
};

export default App;
