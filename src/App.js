// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import app from './firebase';
import Login from './components/Login';
import HomePage from './components/HomePage';
import "./App.css"


const App = () => {
  // Check current user authentication status
  const auth = getAuth(app);
  const [user, loading, error] = useAuthState(auth);


  console.log("User:", user);
  console.log("Loading:", loading);
  console.log("Error:", error);


  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected route for the homepage */}
        <Route
          path="/home"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
        {/* Navigate any unknown paths to /login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};


export default App;

