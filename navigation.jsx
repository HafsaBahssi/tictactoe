// Navigation.js

import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="./Signin">Sign In</Link>
        </li>
        <li>
          <Link to="./Signup">Sign Up</Link>
        </li>
        <li>
          <Link to="./component/GameModeSelection">Sign Up</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
