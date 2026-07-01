import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [backendMessage, setBackendMessage] = useState("");

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function handleRegister() {
    navigate(`/register`);
  }

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const validUser = await axios.post(
        "http://localhost:5000/login",
        formData,
      );
      if (validUser.data.success) {
        setBackendMessage("LOGGING innn");
        navigate("/main");
      }
    } catch (err) {
      // console.log(err.response.data.message);
      setBackendMessage(err.response.data.message);
    }
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        ></input>
        <label> Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        {backendMessage && <p>{backendMessage}</p>}
        <button type="submit">Login</button>
        <button onClick={handleRegister}>Register</button>
      </form>
    </div>
  );
}
