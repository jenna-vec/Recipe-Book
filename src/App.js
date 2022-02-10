import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation, Home, Login, Register, Account, Recipe } from './components';
import { auth } from "./firebase";
import './App.css';


function Copyright() {
  return (
    <footer>
      <Typography variant="body2" color="text.secondary" align="center">
        {'© '}
        {new Date().getFullYear()}
        {' '}
        <Link color="inherit" href="https://recipesbooks.net/">
          Recipe Book
        </Link>{' | '}
        <Link href='https://github.com/jenna-vec'>Jenna LeFort</Link>
      </Typography>
    </footer>
  );
}

function App() {

  const [user, setUser] = useState([]);

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
    else {
      console.log("none")
    }
  });

  return (
    <Router>
      <Navigation user={user} />
      <div className='main-flex'>
        <Routes>
          <Route exact path="/" element={<Home user={user} />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/account" element={<Account user={user} />} />
          <Route path="/:recipe" element={<Recipe user={user} />}
        />
        </Routes>
      </div>
      <Copyright />
    </Router>
  );
}

export default App;
