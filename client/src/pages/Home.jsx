import React from 'react';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../store/slices/authSlice.js';
import {alertSuccess} from '../utils.js';
import Btn from '../components/Btn.jsx';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userObject = useSelector((state) => state.auth.user);
  const _handleLogout = () => {
    dispatch(logout());
    alertSuccess('Logged out successfully');
    navigate('/login');
  };

  const _renderedHeader = (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-gray-700" style={{marginRight: '100px'}}>Home</h2>
      <Btn handler={_handleLogout} content={'Log out!'}/>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="bg-white p-8 rounded shadow-md m-5">
        {_renderedHeader}
        {userObject ? <div>User email: {userObject.user.email} </div>: 'loading ....'}
      </div>
    </div>
  );
};

export default Home;
