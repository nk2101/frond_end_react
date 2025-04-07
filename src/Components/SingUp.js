import React, { useState } from "react";
import axios from "axios";
import { saveToken } from "../Utils/auth";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    <Alert severity="success">This is a success Alert.</Alert>
    try {
      const res = await axios.post(`${process.env.REACT_API}/signup`, form);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      navigate("/login");
      //   alert(err.response.data.message || "Signup failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{textAlign: "center" }}>
        <h2>Sign Up</h2>
        <div>
          <input
            name="name"
            placeholder="Name"
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", padding: "5px" }}
          />
          <br />
          <br />
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={handleChange}
            required
            style={{ borderRadius: "5px", padding: "5px" }}
          />
          <br />
          <br />
          <input
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            style={{ borderRadius: "5px", padding: "5px" }}
            required
          />
          <br />
          <br />
          <button
            type="submit"
            style={{
              backgroundColor: "black",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            Sign Up
          </button>
          <br />
          <br />
        </div>
      </div>
    </form>
  );
};

export default Signup;
