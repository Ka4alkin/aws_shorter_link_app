import React, {useEffect} from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import LoginForm from './forms/LoginForm.jsx';
import NotFound from './components/NotFound.jsx';
import './index.css';
import Signup from './forms/SignupForm.jsx';
import {useDispatch, useSelector} from 'react-redux';
import {getTokenFromLocalStorage, parseJwt} from './utils.js';
import {getUserByEmail} from './store/actions/authActions.js';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const _checkAuth = () => {
    const token = getTokenFromLocalStorage();
    if (!token) return;
    const parsedTokenDataObject = parseJwt(token);
    if (!parsedTokenDataObject?.email) return;
    dispatch(getUserByEmail(parsedTokenDataObject.email));
  };

  useEffect(() => {
    _checkAuth();
  }, []);

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Home /> : <LoginForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
