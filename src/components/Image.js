import React, { useState } from "react";
import firebase from "../Firebase.js";
import { Button } from "react-bootstrap";
export default function Image() {
  const [image, setImage] = useState();
  const [imageurl, setImageurl] = useState();
  var user = JSON.parse(localStorage.getItem("userInfo"));
  console.log(user);

  var token = JSON.parse(localStorage.getItem("token"));
  console.log(token);
  const types = ["image/png", "image/jpg"];
  var imageRef = React.createRef();
  async function imageUpdate() {
    var user = JSON.parse(localStorage.getItem("userInfo"));
    console.log(user);
    var userId = user.id;
    console.log(userId);
    const ref = firebase.firestore().collection("profileImage").doc();
    console.log(ref);
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
    console.log("onImageSelected");

    setImage(imageRef.current.files[0]);
  }
  return (
    <div>
      <h2>Image</h2>
      <input type="file" ref={imageRef} onChange={onImageSelected} />
      <Button onClick={imageUpdate}>update image</Button>
    </div>
  );
}
