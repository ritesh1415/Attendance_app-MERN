import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Attendance = () => {
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState(localStorage.getItem('userId') || ''); 
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      const timeString = now.toLocaleTimeString([], timeOptions);
      setCurrentTime(timeString);
      setCurrentDate(now.toLocaleDateString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleSignIn = async () => {
    try {
      const response = await fetch('http://localhost:8080/sign-in/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          role:'',
          user: userId,
        }),
      });

      const data = await response.json();

      setMessage(data.message);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleViewReport = () => {
    navigate('/view-report');
  };
  
  const handleSignOut = async () => {
    try {
      const response = await fetch(`http://localhost:8080/sign-out/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: userId,
        }),
      });
  
      const data = await response.json();
  
      setMessage(data.message);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const Header = () => (
    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
      <h1>Attendance App</h1>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <p> {currentDate}</p>
        <p>{currentTime}</p>
        <button
          type="button"
          className="btn btn-primary"
          style={{ marginRight: '10px' }}
          name="sign-in"
          onClick={handleSignIn}
        >
          Sign In
        </button>
        <button type="button" className="btn btn-primary" onClick={handleViewReport}>
          View Report
        </button>
        <p>{message}</p>
        <button type="button" className="btn btn-primary" onClick={handleSignOut}>
          Sign-out
        </button>
      </div>
    </>
  );
};

export default Attendance;
