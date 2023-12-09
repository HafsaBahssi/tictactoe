import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase'; // Import your Firebase auth instance
import { Helmet } from 'react-helmet';

const Logout = () => {
  const navigate = useNavigate(); // useNavigate should be used directly within a component
  const [showGoodbyeMessage, setShowGoodbyeMessage] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth.signOut(); // Utilize the auth instance from your firebase.js
        setShowGoodbyeMessage(true);

        // Redirect automatically after 3 seconds (3000 milliseconds)
        setTimeout(() => {
          setShowGoodbyeMessage(false);
          navigate("/signin");
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de la déconnexion :", error.message);
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div>
       <Helmet>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css" />
        <link href='https://fonts.googleapis.com/css?family=Source+Code+Pro' rel='stylesheet' type='text/css'/>
        <link href="https://db.onlinewebfonts.com/c/f74e8087cf22684b3e836f12efda287e?family=Tictac+W01+Toe" rel="stylesheet"></link>

      </Helmet> 
      {showGoodbyeMessage && (
        <div className="test">Goodbye</div>
      )}
    </div>
  );
};

export default Logout;
