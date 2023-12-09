import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import {createUserWithEmailAndPassword} from"firebase/auth"
import React,{useState} from 'react'
import './signup.css'; 
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import auth  from "../../firebase";
const Signup = () => {
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const navigate = useNavigate();

    const signup=(e)=>{
        e.preventDefault();
        createUserWithEmailAndPassword(auth,email,password)
        .then((userCredential) =>{
            console.log(userCredential);
            Swal.fire({
                icon: 'success',
                title: 'Account created successfully!',
                text: 'Please sign in.',
              });
            navigate('/Signin');
        } ).catch((error)=>{
            console.log(error);
        })
    }

  return (
    <div className='login-box'>
        <h2>Create Gaming Account</h2>
            <form onSubmit={signup} >
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
                <button type="submit" >Sign Up</button>
                </a>
            </form>
            
    </div>
  )
}

export default Signup;