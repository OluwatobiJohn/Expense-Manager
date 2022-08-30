import React from "react";
import { ReactComponent as ReactLogo } from "../assets/VectorReact.svg";
import { ReactComponent as JsLogo } from "../assets/Js.svg";
import { ReactComponent as FireB } from "../assets/Fire.svg";

const Info = () => {
  const profilePhoto = null;
  return (
    <div className="profile-main">
      <p>This Expence Manager was Built with:</p>
      <div style={{ display: "flex", flexDirection: "row", gap: "30px" }}>
        <ReactLogo style={{ width: "50px", height: "50px" }} />
        <JsLogo style={{ width: "50px", height: "50px" }} />
        <FireB style={{ width: "50px", height: "50px" }} />
      </div>
    </div>
  );
};

export default Info;
