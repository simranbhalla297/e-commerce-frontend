import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import firebase from "../Firebase.js";
function Profile() {
  const [firstname, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [lastname, setLastName] = useState("");
  const [age, setAge] = useState();
  const [phone, setphone] = useState();
  const [address, setAddress] = useState();
  const [image, setImage] = useState();
  const [imageurl, setImageurl] = useState();
  let history = useHistory();

  //console.log(history);
  var user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);

  var token = JSON.parse(localStorage.getItem("token"));
  //console.log(token);
  //image
  const types = ["image/png", "image/jpg"];
  var imageRef = React.createRef();

  useEffect(() => {
    if (!user || !token) {
      history.push("/login");
    }
    async function getUserdetail() {
      const response = await fetch(`http://localhost:5000/auth/user`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          "x-auth-token": token,
        },
      });
      const data = await response.json();
      setFirstName(data.firstname);
      setEmail(data.email);
      setLastName(data.lastname);
      setAge(data.age);
      setAddress(data.address);
      setphone(data.phone);
      // console.log(data);
    }
    getUserdetail();
  }, []);

  async function imageUpdate() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    //  console.log(user);
    var userId = user.id;
    // console.log(userId);
    const ref = firebase.firestore().collection("profileImage").doc();
    // console.log(ref);
    let downloadUrl = null;
    if (image) {
      //let uuid = uuidv4();
      let storageImageRef = firebase
        .storage()
        .ref(`images/profile/${userId}.jpg`);
      let taskSnapshot = await storageImageRef.put(image);
      downloadUrl = await taskSnapshot.ref.getDownloadURL();
      setImageurl(downloadUrl);
    }
    var UserProfile = {
      picture: downloadUrl,
    };
    ref.set(UserProfile);
  }
  //set profile picture
  function onImageSelected(e) {
    // console.log("onImageSelected");

    setImage(imageRef.current.files[0]);
  }

  //update on button click
  const updateProfile = () => {
    const updateduserDetail = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      age: age,
      phone: phone,
      address: address,
    };
    fetch("http://localhost:5000/auth/profile", {
      method: "POST",
      body: JSON.stringify(updateduserDetail),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "x-auth-token": token,
      },
    }).then((res) => {
      alert("data changed");
    });
  };

  return (
    <div>
      <h2>Welcome :{firstname} you arelogged in</h2>
      <input type="file" ref={imageRef} onChange={onImageSelected} />
      <Form>
        <Form.Group>
          <Form.Label>First name :</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            value={firstname}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name: </Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="Number"
            placeholder="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Phone Number: </Form.Label>
          <Form.Control
            type="Number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setphone(e.target.value)}
          />
        </Form.Group>
      </Form>

      <br />
      <br />
      <Button onClick={updateProfile}>update</Button>
      <Button onClick={imageUpdate}>update image</Button>
    </div>
  );
}
export default Profile;
