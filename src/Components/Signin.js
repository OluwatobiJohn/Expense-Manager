import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import MetaTags from "react-meta-tags";
import { Container, Row, Card, CardBody, Input } from "reactstrap";
import PasswordInput from "./PasswordInput";
import { auth } from "./helper/firebase";
import { MoonLoader } from "react-spinners";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const registerUser = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      setLoading(false);
      if (user) navigate("/dashboard");
    });
  }, []);
  return (
    <React.Fragment>
      <MetaTags>
        <title>Sign in</title>
      </MetaTags>
      {loading ? (
        <div className="login-cont">
          <MoonLoader color="white" loading={loading} size={40} />
        </div>
      ) : (
        <>
        <div style={{backgroundColor: "#22539E"}}>
        <div className="auth-header">
            <p className="dashboard-header-title">
              Employee Expense Management
            </p>
          </div>
          <div className="login-cont">
            <Container>
              <Card className="main-login">
                <CardBody>
                  <p className="login-header">Create an Account</p>
                  <Row className="label-row">
                    <label>Email</label>
                    <Input
                      className="form-control"
                      placeholder="Enter Email"
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    ></Input>
                  </Row>
                  <Row className="label-row password-row">
                    <PasswordInput
                      label="Password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.currentTarget.value)}
                    />
                  </Row>
                  <button
                    className="login-btn"
                    onClick={() => {
                      registerUser();
                    }}
                  >
                    Register
                  </button>
                  <p style={{ fontSize: "14px" }}>
                    Have an Account?{" "}
                    <NavLink to="/login" style={{ textDecoration: "none" }}>
                    <span
                      style={{
                        borderBottom: "2px solid hsl(214, 35%, 21%)",
                        color: "black",
                      }}
                    >
                      Login
                    </span>
                  </NavLink>
                  </p>
                </CardBody>
              </Card>
            </Container>
          </div>
        </div>
          
        </>
      )}
    </React.Fragment>
  );
};

export default Signin;
