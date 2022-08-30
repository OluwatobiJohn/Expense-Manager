import React from "react";

const Profile = () => {
  const profilePhoto = null;
  return (
    <div className="profile-main">
      <div>
        {!profilePhoto ? (
          <div className="avatar-lg">
            <span className="avatar-title rounded-circle">
              <h1>P</h1>
            </span>
          </div>
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
        <h3>First Name</h3>
        <h3>Last Name</h3>
      </div>
      <div>
        <p>This is my Bio</p>
      </div>
      <div>
        <h5>someemail@gmail.com</h5>
      </div>
      <button className="login-btn" style={{ padding: "5px 15px" }}>
        Edit
      </button>
    </div>
  );
};

export default Profile;
