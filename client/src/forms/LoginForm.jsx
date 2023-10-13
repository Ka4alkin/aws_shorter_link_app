import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {login} from '../store/actions/authActions.js';
import {InputBox} from '../components/InputBox.jsx';
import {validateInput, validateInputPassword} from '../utils.js';
import {cfg} from '../config.js';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const _handleLogin =async () => {
    const handleLoginDataObject = {email, password};
    await dispatch(login(handleLoginDataObject));
    navigate('/');
  };

  const _validateForm = () => {
    const newErrors = {};

    validateInput(email, cfg.emailPattern, newErrors, 'email');
    validateInputPassword(password, newErrors);

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-gray-700">Login</h2>
        <InputBox
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          error={errors.email}
        />
        <InputBox
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          error={errors.password}
        />
        <button
          className="w-full py-2 px-4 bg-gray-500 hover:bg-gray-600 text-white rounded-md focus:ring focus:ring-gray-200"
          onClick={() => {
            if (_validateForm()) {
              _handleLogin();
            }
          }}
        >
          Login
        </button>
        <div className="mt-4 text-gray-600 text-center">
          Don&apos;t have an account? <Link to="/signup" className="text-blue-500">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
