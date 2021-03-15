import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { getuserLoginDetails } from "../../actions/userActions";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
function Login() {
  let history = useHistory();

  console.log(history);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userinfo = useSelector((state) => state.userInfo);
  console.log(userinfo);

  var user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);
  const onChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    setPassword(e.target.value);
    console.log(` ${email} ${password}`);
    getUserdetail();
  };
  async function getUserdetail() {
    //create object
    const loginuserDetails = {
      email,
      password,
    };
    console.log(loginuserDetails);

    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(loginuserDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    //converting to json
    if (!response.ok) {
      const error = await response.json();
      console.log(error);
    } else {
      const data = await response.json();
      console.log(data);
      dispatch(getuserLoginDetails(data));
      //save userInfo in localstorage
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", JSON.stringify(data.token));
    }
  }

  useEffect(() => {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    if (user) {
      history.push("/");
    }
  });

  return (
    <div>
      <form className="signup-form">
        <h2>Log in</h2>
        <hr />
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
            Log in
          </button>
        </div>
        <div className="text-center">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
}

export default connect()(Login);
