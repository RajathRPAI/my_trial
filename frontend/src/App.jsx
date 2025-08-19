import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import TestPage from './pages/TestPage';
import AttemptDetails from './pages/AttemptDetails';

import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (<div><Navbar /><Routes>
    <Route path='/' element={<div className='p-4'>Welcome to Mock Test App</div>} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/dashboard' element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
    <Route path='/test/:id' element={<ProtectedRoute><TestPage /></ProtectedRoute>} />
    <Route path='/attempt/:id' element={<ProtectedRoute><AttemptDetails /></ProtectedRoute>} />
  </Routes></div>);
}
