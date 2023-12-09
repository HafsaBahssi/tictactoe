

import React from 'react';
import { Link } from 'react-router-dom';
import Signin from './Signin';
import Signup from './Signup';

const Home = () => {
  return (
    <div>
      <div>
        <Link to="./Signin"><button class="btn third">Sign In</button></Link>
        <Link to="./Signup"><button class="btn third">Sign Up</button> </Link>
    </div>
    </div>
  );
};

export default Home;
