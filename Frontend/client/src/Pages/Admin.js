import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();
  const [allUserAttendance, setAllUserAttendance] = useState([]);

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const response = await axios.get("http://localhost:8080/all-users");
        if (response.data.success) {
          setAllUserAttendance(response.data.attendance);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAttendance();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate('/login');
  };

  const Header = () => {
    return (
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', borderBottom: '1px solid #ccc' }}>
        <h1>Attendance App</h1>
        <button onClick={handleLogout}>Logout</button>
      </header>
    );
  };

  return (
    <>
      <Header />
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>All User Attendance</h1>
        {allUserAttendance && allUserAttendance.length === 0 ? (
          <p>No attendance data available</p>
        ) : (
          <table className="table" style={{ fontSize: '14px' }}>
            <thead>
              <tr>
                <th>User</th>
                <th>Date</th>
                <th>Sign In Time</th>
                <th>Sign Out Time</th>
              </tr>
            </thead>
            <tbody>
              {allUserAttendance.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry.user ? entry.user.email : 'N/A'}</td>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>
                  <td>{entry.signIn ? (typeof entry.signIn === 'object' ? entry.signIn.time : entry.signIn) : 'N/A'}</td>
                  <td>{entry.signOut ? (typeof entry.signOut === 'object' ? entry.signOut.time : entry.signOut) : 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Admin;
