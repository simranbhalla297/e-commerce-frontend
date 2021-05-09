import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../Variables";
function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    e.preventDefault();
    setFirstname(firstname);
    setLastname(lastname);
    setEmail(e.target.value);
    setPassword(e.target.value);
    console.log(`${email}  ${password} ${firstname} ${lastname}`);
    createPost();
  };
  async function createPost() {
    //create object
    const registerUserDetails = {
      firstname,
      lastname,
      email,
      password,
    };
    console.log(registerUserDetails);

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(registerUserDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    //converting to json
    const data = await response.json();
    console.log(data);
  }

  return (
    <div>
      <form className="signup-form">
        <h2>Register</h2>
        <hr />
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            id="name"
            placeholder="Name"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary btn-block btn-lg"
            onClick={onChange}
          >
            Sign Up
          </button>
        </div>
        <div className="text-center">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </form>
    </div>
  );
}
export default Register;
