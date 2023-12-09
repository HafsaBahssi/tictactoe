import React,{ useState } from 'react';
import { Link , useNavigate ,useParams  } from 'react-router-dom';
import './GameModeSelection.css'; 
import auth from "../firebase";

import { Helmet } from 'react-helmet';
const GameModeSelection = () => {
  const { action } = useParams();
  const navigate = useNavigate();
  const onClickLogout = async () => {
    try {
      await auth.signOut(); // Use the auth instance from your firebase.js file
      navigate("/Signin/logout"); // Add a parameter to the URL
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error.message);
    }
  };
  return (
    <div>
        <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro' rel='stylesheet' type='text/css'/>
        <link href="https://db.onlinewebfonts.com/c/f74e8087cf22684b3e836f12efda287e?family=Tictac+W01+Toe" rel="stylesheet"></link>
        <script src="https://kit.fontawesome.com/8e427a9f39.js" crossorigin="anonymous"></script>
      </Helmet> 
      <div className="navigation">

          <Link to="/Signin">
            <a className="button" href="" onClick={onClickLogout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <div className="logout">LOGOUT</div>
            </a>
          </Link>
        
      </div>
      <div className='test'>Tic Tac Toe</div>
      {window.location.pathname === '/Signin' && (
        <div className="goodbye-message">Au revoir !</div>
      )}
      {/* Bouton pour choisir le mode "Player vs Player" */}
      <Link to="/playervsplayer">
        <button className="btn third">Player vs Player</button>
      </Link>

      {/* Bouton pour choisir le mode "Player vs Computer" */}
      <Link to="/playervscomputer">
        <button className="btn third">Player vs Computer</button>
      </Link>
    </div>
  );
};

export default GameModeSelection;