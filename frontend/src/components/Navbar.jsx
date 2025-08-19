import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar(){ const token = localStorage.getItem('token'); const role = localStorage.getItem('role'); const logout=()=>{localStorage.clear(); window.location='/login'};
  return (<nav className='bg-blue-600 text-white p-3 flex justify-between'><div className='space-x-4'><Link to='/'>Home</Link>{token&&<Link to='/dashboard'>Dashboard</Link>}{role==='admin'&&<Link to='/admin'>Admin</Link>}</div><div>{token ? <button onClick={logout}>Logout</button> : <Link to='/login'>Login</Link>}</div></nav>);
}
