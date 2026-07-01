import axios from "axios";
import { useState } from "react";
import { useFormState } from "react-dom";

export default function Register() {
  const [userDtl, setUserDetail] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });
  const [error, setError] = useState(false);

  function handleChange(e) {
    setUserDetail({ ...userDtl, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (userDtl.password != userDtl.confirmPass) {
      setError(true);
    } else {
      setError(false);
      const response = await axios.post(
        "http://localhost:5000/user/register",
        userDtl,
      );
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Email </label>
        <input
          id="email"
          name="email"
          type="email"
          value={userDtl.email}
          onChange={handleChange}
        ></input>
        <label> Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={userDtl.password}
          onChange={handleChange}
        ></input>
        <label> Confirm Password </label>
        <input
          id="confirmPass"
          name="confirmPass"
          type="password"
          value={userDtl.confirmPass}
          onChange={handleChange}
        ></input>
        {error && <p> Passwrod does not match </p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
