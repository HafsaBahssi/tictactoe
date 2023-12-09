import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import {signInWithEmailAndPassword} from"firebase/auth"
import React,{useState} from 'react'
import './signin.css'; 
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import auth  from "../../firebase";
const Signin = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();
    const signIn=(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth,email,password)
        .then((userCredential) =>{
            console.log(userCredential);
            navigate('/game-mode-selection');
        } ).catch((error)=>{
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: 'Invalid email or password',
              });        })
    }

  return (
    <div className='login-box'>
        <h2>Gaming Login Form</h2>
            <form onSubmit={signIn} >
                <div className="user-box">
                <input type="email" name="" required="" 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)}
                />
                <label>Username</label>
                </div>
                <div className="user-box">
                <input type="password" name="" required="" 
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                />
                <label>Password</label>
                </div>
                <a href="#" >
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <button type="submit" >Sign in</button>
                </a>
            </form>
            <p>
                Don't have an account? <Link to='/Signup' className='link'>Sign Up</Link>
            </p>
    </div>
  )
}

export default Signin