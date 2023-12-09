import React, { useState, useEffect } from 'react';
import applauseSound from './applause.mp3'; 
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';
import './playervsplayer.css'; 

import { useNavigate } from 'react-router-dom';
function Square({ value, onSquareClick, isWinningSquare }) {
  const className = "square" + (isWinningSquare ? " winning" : "");
  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default function Board() {
    const navigate = useNavigate();
    const [applauseAudio, setApplauseAudio] = useState(new Audio(applauseSound));
    useEffect(() => {
        applauseAudio.src = applauseSound;
        // Charger le fichier audio avant de jouer
        applauseAudio.load();
    }, [applauseAudio]);
    const initialSquares = Array(9).fill(null);
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(initialSquares);
    const [winner, setWinner] = useState(null);
    useEffect(() => {
        const winner = calculateWinner(squares);
        if (winner) {
          showWinnerAlert(winner);
        }
        
      }, [squares]);
    function handleClick(i) {
        if (squares[i] || winner) {
         return;
        }

         const nextSquares = squares.slice();
         nextSquares[i] = xIsNext ? 'X' : 'O';
        setSquares(nextSquares);

         const winnerInfo = calculateWinner(nextSquares);
        if (winnerInfo) {
            showWinnerAlert(winner);
        } else {
            setXIsNext(!xIsNext);
        }
  }
  const showWinnerAlert = (winner) => {
    const winnerText = winner ? `Player ${winner} Wins! 🎉` : 'It\'s a draw!';

    Swal.fire({
      title: winnerText,
      icon: 'success',
      confirmButtonText: 'Play Again',
      showCancelButton: true,
      cancelButtonText: 'Back to Previous Page',
      didOpen: () => {
        applauseAudio.play();
      },
      willClose: () => {
        stopApplauseSound();
      },
        
      
    }).then((result) => {
      if (result.isConfirmed) {
        stopApplauseSound();
        setSquares(initialSquares);
        setXIsNext(true);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        stopApplauseSound();
        navigate(-1);
      }
    });
  };
  const stopApplauseSound = () => {
    applauseAudio.pause();
    applauseAudio.currentTime = 0;
  };
  const resetGame = () => {
    setSquares(initialSquares);
    setXIsNext(true);
    setWinner(null);
  };

  const status = winner
    ? `Winner: ${winner === 'X' ? 'Human' : 'Computer'}`
    : `Next player: ${xIsNext ? 'X Human' : 'O Computer'}`;

  useEffect(() => {
    if (!xIsNext && !winner) {
      const timeoutId = setTimeout(() => {
        const availableSquares = squares.map(
          (square, index) => (square === null ? index : null)
        ).filter((square) => square !== null);

        const robotMove = getRobotMove(squares, availableSquares, xIsNext);
        handleClick(robotMove);
      }, 1000); // Delay of 1 second
      return () => clearTimeout(timeoutId);
    }
  }, [xIsNext, squares, winner]);

  return (
    <div className="tic-tac-toe">
        <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro' rel='stylesheet' type='text/css'/>
        <link href="https://db.onlinewebfonts.com/c/f74e8087cf22684b3e836f12efda287e?family=Tictac+W01+Toe" rel="stylesheet"></link>

      </Helmet> 
      <div className='test1'>
      <span role="img" aria-label="Human">🧑</span>
      <span role="img" aria-label="Cross">❌</span>
      <span className='test'>VS</span>
      <span role="img" aria-label="Computer">🖥️</span>
      <span role="img" aria-label="Circle">⭕</span>
    </div>
      <div className="board">
        <div className="board-row">
          {[0, 1, 2].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
              isWinningSquare={winner && winner.includes(col)}
            />
          ))}
        </div>
        <div className="board-row">
          {[3, 4, 5].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
              isWinningSquare={winner && winner.includes(col)}
            />
          ))}
        </div>
        <div className="board-row">
          {[6, 7, 8].map((col) => (
            <Square
              key={col}
              value={squares[col]}
              onSquareClick={() => handleClick(col)}
              isWinningSquare={winner && winner.includes(col)}
            />
          ))}
        </div>
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
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        console.log(squares[a]);
      return squares[a];
    }
  }

  return null;
}

function getRobotMove(squares, availableSquares, xIsNext) {
  for (let i = 0; i < availableSquares.length; i++) {
    const copySquares = squares.slice();
    copySquares[availableSquares[i]] = xIsNext ? 'X' : 'O';
    if (calculateWinner(copySquares) === (xIsNext ? 'X' : 'O')) {
      return availableSquares[i];
    }
  }

  for (let i = 0; i < availableSquares.length; i++) {
    const copySquares = squares.slice();
    copySquares[availableSquares[i]] = xIsNext ? 'O' : 'X';
    if (calculateWinner(copySquares) === (xIsNext ? 'O' : 'X')) {
      return availableSquares[i];
    }
  }

  return availableSquares[Math.floor(Math.random() * availableSquares.length)];
}