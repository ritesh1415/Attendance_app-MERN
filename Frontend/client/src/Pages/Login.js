import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/login", {
        email: input.email,
        password: input.password
      });
      
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        Swal.fire({
          icon: 'success',
          title: 'Logged in successfully',
        }).then(() => {
          if (input.email === 'admin@gmail.com') {
            navigate('/all-users');
          } else {
            navigate('/attendance');
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Login failed',
        });
      }
    } catch (error) {
      console.error(error.message);
      Swal.fire({
        icon: 'error',
        title: 'please provide all valid fields',
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={input.email}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={input.password}
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginRight: '20px', marginTop:'20px'}} className="btn btn-primary">
          Login
        </button>

        <button type="button" onClick={() => navigate('/')} style={{ marginTop: '20px' }} className="btn btn-primary">
         Register
        </button>
      </form>
    </div>
  );
};

export default Login;
