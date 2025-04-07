import React, { useState } from "react";
import axios from "axios";
import { saveToken } from "../Utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_API}/login`, form);
      saveToken(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      navigate("/dashboard");
      // alert(err.response.data.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ textAlign: "center" }}>
        <h2>Log In</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          required
          style={{ borderRadius: "5px", padding: "5px" }}
        />
        <br /> <br />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          required
          style={{ borderRadius: "5px", padding: "5px" }}
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
          Log In
        </button>
        <br /> <br />
      </div>
    </form>
  );
};

export default Login;
