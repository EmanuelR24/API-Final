import React from 'react';  
import { Outlet } from 'react-router-dom';  
import Sidebar from '../components/Sidebar';  

const Dashboard = ({ onLogout }) => (  
  <div className="dashboard">  
    <Sidebar onLogout={onLogout} />  
    <div className="main-content">  
      <Outlet /> /* Aquí se renderizan sub-páginas como Products o Orders */  
    </div>  
  </div>  
);  

export default Dashboard;  