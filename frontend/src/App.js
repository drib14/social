// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);  // Simulate loading state
    }, 2000);
  }, []);

  const isAuthenticated = () => {
    return localStorage.getItem('authToken') !== null;
  };

  return (
    <Router>
      <div className="App">
        {loading ? <Loader /> : null}  {/* Display loader if loading is true */}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Route for Dashboard */}
          <Route
            path="/"
            element={isAuthenticated() ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
