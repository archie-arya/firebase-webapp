
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import '../App.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const [animationStyle, setAnimationStyle] = useState({});

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationStyle({
        backgroundImage: 'url(https://unblast.com/wp-content/uploads/2019/09/Weather-App-Icons-2.jpg)',
        backgroundPosition: `${Math.floor(Math.random() * 100)}% ${Math.floor(Math.random() * 100)}%`,
        transition: 'background-position 5s ease-in-out', 
      });
    }, 5000); 

    return () => clearInterval(interval); 
  }, []);

  const handleLogin = async () => {
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful");
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleSignUp = async () => {
    const auth = getAuth();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Sign-up and login successful!');
      navigate('/home');
    } catch (error) {
      console.error('Sign-up failed:', error.message);
    }
  };

  return (
    <div className="container" style={animationStyle}>
      <div className='form-container'>
        <div className='header'>Welcome to my Weather App!</div>
        <input className='Email' type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input className='pw' type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button className='button' onClick={handleLogin}>Login</button>
        <button className='button' onClick={handleSignUp}>Sign Up</button>
      </div>
    </div>
  );
};

export default Login;
