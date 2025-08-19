import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
export default function UserDashboard(){ const [attempts,setAttempts]=useState([]); useEffect(()=>{ const API=axios.create({ baseURL: process.env.REACT_APP_API_URL||'http://localhost:5000/api' }); const token=localStorage.getItem('token'); if(token) API.defaults.headers.common['Authorization']='Bearer '+token; API.get('/attempts/me').then(r=>setAttempts(r.data)).catch(()=>{}); },[]); return (<div className='p-4'><h1>Dashboard</h1><ul>{attempts.map(a=>(<li key={a._id} className='border p-2 mb-2'>Mock: {a.mock?.title||'N/A'} | Score: {a.score} <Link to={`/attempt/${a._id}`} className='ml-2'>View</Link></li>))}</ul></div>); }
