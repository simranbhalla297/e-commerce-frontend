import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { Button, Form, Row, Col, ListGroup } from "react-bootstrap";
import { BASE_URL } from "../Variables";
import firebase from "../Firebase.js";
function Profile() {
  let history = useHistory();
  const [profile, setProfile] = useState("");
  //console.log(history);
  var user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);

  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(token);

  useEffect(() => {
    if (!user || !token) {
      history.push("/login");
    }
    async function getUserdetail() {
      const response = await fetch(`${BASE_URL}/auth/user`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": token,
        },
      });
      const data = await response.json();
      setProfile(data);
      console.log(data);
    }
    getUserdetail();
  }, []);

  //update on button click

  return (
    <div className="profile">
      <div className="main_profile">
        <div className="profile_box">
          <Row>
            <Col md={3}>
              <div className="profile_icon">
                <div className="profile_image">
                  <span style={{ marginRight: "10px" }}>
                    <img
                      src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                      alt="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/profile-pic-male_4811a1.svg"
                      style={{ width: "50px", height: "50px" }}
                    />
                  </span>
                </div>
                <div className="profie-text_container">
                  <p>{profile.firstname}</p>
                  <p>{profile.email}</p>
                  <p>{profile.phone}</p>
                </div>
                <div className="profile_list">
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <p>My Offers</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>My Transaction</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>My Wallet</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>My Address Book</p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <p>Logout</p>
                    </ListGroup.Item>
                  </ListGroup>
                </div>
              </div>
            </Col>

            <Col>
              <div className="profile_container">
                <div className="profile_text">
                  <div className="profile_Heading">
                    <h2>Personal Information</h2>
                  </div>
                  <div>
                    <div className="profile_information">
                      <p>
                        <span
                          style={{ marginRight: "198px", fontWeight: "bold" }}
                        >
                          First name
                        </span>
                        {profile.firstname}
                      </p>
                      <p>
                        <span
                          style={{ marginRight: "200px", fontWeight: "bold" }}
                        >
                          Last name
                        </span>
                        {profile.lastname}
                      </p>
                      <p>
                        <span
                          style={{ marginRight: "172px", fontWeight: "bold" }}
                        >
                          Email address
                        </span>
                        {profile.email}
                      </p>
                      <p>
                        <span
                          style={{ marginRight: "70px", fontWeight: "bold" }}
                        >
                          Mobile Number (10 digits)
                        </span>{" "}
                        {profile.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="profilebtn">
                  <Button className="buttonProfile">
                    <Link
                      to="/editprofile"
                      style={{ textDecoration: "none", color: "#fff" }}
                    >
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default Profile;
