import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Report = () => {
  const [allUserAttendance, setAllUserAttendance] = useState([]);
  const userId = localStorage.getItem('userId');
const navigate=useNavigate()
  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/get-attandence/${userId}`);
        if (response.data.success) {
          setAllUserAttendance(response.data.userAttendance);
        } else {
          console.log(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllAttendance();
  }, [userId]);

  const handle=()=>{
    navigate('/login')
  }

  
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1> User Attendance</h1>
      {allUserAttendance && allUserAttendance.length === 0 ? (
        <p>No attendance data available</p>
      ) : (
        <table className="table" style={{ fontSize: '14px' }}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Sign In Time</th>
              <th>Sign Out Time</th>
            </tr>
          </thead>
          <tbody>
            {allUserAttendance.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.signIn ? (typeof entry.signIn === 'object' ? entry.signIn.time : entry.signIn) : 'Pending'}</td>
                <td>{entry.signOut ? (typeof entry.signOut === 'object' ? entry.signOut.time : entry.signOut) : 'pending'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button type="button" className="btn btn-primary"  onClick={handle}>
        Logout
      </button>
    </div>
  );
};

export default Report;
