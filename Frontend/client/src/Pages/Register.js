import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
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
      const { data } = await axios.post("http://localhost:8080/register", {
        username: input.username,
        email: input.email,
        password: input.password,
        phone: input.phone
      });

      console.log("Server Response:", data); // Log the server response

      if (data.success === true) { // Ensure data.success is explicitly true
        console.log("Successfully registered");
        Swal.fire({
          title: 'Registered successfully',
          icon: 'error',

        }).then(() => {
          navigate('/login');
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: data.message || 'Registration failed',
        });
      }
    } catch (error) {
      console.error("Error during registration", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Registration failed. Please try again later.',
      });
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form style={{ width: '300px' }} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">UserName</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            name="username"
            value={input.username}
            required
            onChange={handleChange}
          />
        </div>

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
            required
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
            required
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="exampleInputPhone">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="exampleInputPhone"
            placeholder="Enter phone number"
            name="phone"
            value={input.phone}
            required
            onChange={handleChange}
          />
        </div>

        <button type="submit" style={{ marginRight: '20px', marginTop:'20px'}} className="btn btn-primary">
          Register
        </button>

        <button type="button" style={{ marginRight: '20px', marginTop:'20px'}} onClick={() => navigate('/login')} className="btn btn-primary">
         Login
        </button>
      </form>
    </div>
  );
};

export default Register;
