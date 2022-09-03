import React, { useState, useEffect } from "react";
import { auth } from "./helper/firebase";
import { getStorage, uploadBytes, ref, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { Row, Input, Spinner } from "reactstrap";
import { WindowRounded } from "@mui/icons-material";

const Profile = () => {
  const [addLoading, setAddLoading] = useState(false);
  const [newFullName, setNewFullName] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [currentUser, setCurrentUser] = useState();
  const [photo, setPhoto] = useState(null);
  const [profilePhoto, setprofilePhoto] = useState();
  const storage = getStorage();

  const update = async (file, currentUser) => {
    setAddLoading(true);
    const fileRef = ref(storage, "profile" + ".png");
    const snapshot = await uploadBytes(fileRef, file);
    const photoURL = await getDownloadURL(fileRef);
    updateProfile(currentUser, {
      displayName: newFullName,
      photoURL: photoURL,
    });
    setAddLoading(false);
    successModal();
  };

  const fieldsModal = () => {
    let a = document.getElementById("myDIV4");

    a.style.display = "block";
  };

  const successModal = () => {
    let b = document.getElementById("myDIV5");

    b.style.display = "block";
  };

  const closeFields = () => {
    let a = document.getElementById("myDIV4");

    a.style.display = "none";
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      console.log(e.target.files[0]);
      setPhoto(e.target.files[0]);
    }
  };
  const handleClick = () => {
    console.log(photo);
    if (!newFullName || !photo) {
      fieldsModal();
      return;
    }
    update(photo, currentUser);
  };
  const closeModal = () => {
    let z = document.getElementById("myDIV3");
    let b = document.getElementById("myDIV5");
    z.style.display = "none";
    b.style.display = "none";

    setFullName(currentUser.displayName)
    setprofilePhoto(currentUser.photoURL);
    setEmail(currentUser.email);
  };

  const myFunction = () => {
    let x = document.getElementById("myDIV3");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
        if (user.email) {
          setEmail(user.email);
        }
        if (user.displayName) {
          setFullName(user.displayName);
        }
        if (user.photoURL) {
          setprofilePhoto(user.photoURL);
        }
        if (currentUser) {
          console.log(currentUser);
        }
      }
    });
  }, [currentUser]);
  return (
    <>
      <div className="profile-main">
        <div>
          {!profilePhoto ? (
            <>
              <div className="avatar-lg">
                <span className="avatar-title rounded-circle">
                  <h1>{email && email.charAt(0).toUpperCase()}</h1>
                </span>
              </div>
            </>
          ) : (
            <div>
              <img
                className="rounded-circle avatar-lg"
                src={profilePhoto}
                alt=""
              />
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
          <h3>{fullName ? fullName : "No Display Name"}</h3>
        </div>
        <div>
          <h5>{email}</h5>
        </div>
        <button
          className="login-btn"
          style={{ padding: "5px 15px" }}
          onClick={myFunction}
        >
          Edit
        </button>
      </div>
      <div
        tabindex="-1"
        id="myDIV3"
        className="modal-div"
        style={{ display: "none", height: "400px" }}
      >
        <p
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "40px" }}
        >
          Edit Your Profile
        </p>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Name</label>
          <Input
            className="form-control"
            placeholder="Enter Name"
            value={newFullName}
            onChange={(e) => setNewFullName(e.currentTarget.value)}
          ></Input>
        </Row>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Profile Picture (png or jpg)</label>
          <input type="file" onChange={handleChange} />
        </Row>
        <button
          className="login-btn"
          style={{
            background: "white",
            color: "black",
            border: "2px solid black",
            marginRight: "10px",
          }}
          onClick={() => {
            closeModal();
          }}
        >
          Close
        </button>
        <button
          className="login-btn"
          onClick={() => {
            handleClick();
          }}
        >
          {addLoading ? (
            <Spinner color="primary">Loading...</Spinner>
          ) : (
            "Update"
          )}
        </button>
      </div>
      <div
        tabindex="-2"
        id="myDIV4"
        className="success-div"
        style={{ display: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Must Enter All Fields
          </p>
          <button
            style={{ width: "100px" }}
            className="login-btn"
            onClick={() => {
              closeFields();
            }}
          >
            Ok
          </button>
        </div>
      </div>
      <div
        tabindex="-2"
        id="myDIV5"
        className="success-div"
        style={{ display: "none" }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              marginBottom: "30px",
            }}
          >
            Profile Updated Successfully
          </p>
          <button
            style={{ width: "100px" }}
            className="login-btn"
            onClick={() => {
              closeModal();
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;
