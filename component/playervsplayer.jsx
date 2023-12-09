import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import './playervsplayer.css';
import { Helmet } from 'react-helmet';
import applauseSound from './applause.mp3'; 
import { useNavigate } from 'react-router-dom';
const initialBoard = Array(9).fill(null);

const TicTacToe = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);
  const [applauseAudio, setApplauseAudio] = useState(new Audio(applauseSound));
  useEffect(() => {
    applauseAudio.src = applauseSound;
    // Charger le fichier audio avant de jouer
    applauseAudio.load();
  }, [applauseAudio]);
  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      showWinnerAlert(winner);
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) {
      return;
    }

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );
  const showWinnerAlert = (winner) => {
    Swal.fire({
      title: `Player ${winner} Wins! 🎉`,
      icon: 'success',
      confirmButtonText: 'Play Again',
      showCancelButton: true,
      cancelButtonText: 'Back to Previous Page',
      didOpen: () => {
        applauseAudio.play();
      },
      onClose: () => {
        // Arrêter le son lorsque l'alerte se ferme
        applauseAudio.pause();
        applauseAudio.currentTime = 0;
      },
      
    }).then((result) => {
      if (result.isConfirmed) {
        stopApplauseSound();
        // Réinitialiser le jeu
        setBoard(initialBoard);
        setIsXNext(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Revenir à la page précédente
        navigate(-1);
      }
    });
  };
  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinner(null);
  };
  const stopApplauseSound = () => {
    applauseAudio.pause();
    applauseAudio.currentTime = 0;
  };
  return (
    <div className="tic-tac-toe">
         <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro' rel='stylesheet' type='text/css'/>
        <link href="https://db.onlinewebfonts.com/c/f74e8087cf22684b3e836f12efda287e?family=Tictac+W01+Toe" rel="stylesheet"></link>

      </Helmet> 
      <div className='test1'>🧑
        <span role="img" aria-label="Cross" className="blue-emoji">❌</span>
         <span className='test'>VS</span>🧑
          <span role="img" aria-label="Circle" className="blue-emoji">⭕</span>
          </div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div className="button-container">
  <button className="btn third" onClick={resetGame}>
    Reset Game
  </button>
  <button className="btn third" onClick={() => navigate(-1)}>
    Change Mode
  </button>
</div>
    </div>
  );
};




// Function to calculate the winner of the game
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default TicTacToe;
