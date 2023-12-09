// ButtonLink.js

import React from 'react';
import { Link } from 'react-router-dom';
import Signin from './component/auth/Signin';
import Signup from './component/auth/Signup';

const ButtonLink = () => {
  return (
    <div>
      <div>
        <Link to="./Signin"><button class="btn fourth">Sign In</button></Link>
        <Link to="./Signup"><button class="btn third">Sign Up</button> </Link>
    </div>
    </div>
  );
};

export default ButtonLink;
