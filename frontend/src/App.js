import 'bootstrap/dist/css/bootstrap.min.css';
import Play from './pages/Play.js';
import Auth from './pages/Auth.js';
import { get } from './utils/baseRequest.js';
import { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const sessionId = encodeURI(localStorage.getItem('sessionId'));
      const response = await get(`/auth/is-valid-session/${sessionId}`);
      const { username, isValidSession } = response.data;
      setLoggedIn(isValidSession);
      setUsername(username); 
    }
    checkAuth();
  }, []);

  const renderWebPage = () => {
    if (loggedIn){
      return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Play />}/>
          </Routes>
        </BrowserRouter>
      );
    }
    return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Auth />} />
          <Route path='/free-play' element={<Play />}/>
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    renderWebPage()
  );
}

export default App;
