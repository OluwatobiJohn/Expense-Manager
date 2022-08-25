import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import { Container, Row, Card, CardBody, Input } from "reactstrap";
import PasswordInput from "./PasswordInput";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <React.Fragment>
      <MetaTags>
        <title>Login</title>
      </MetaTags>
      <div className="login-cont">
        <Container>
          <p className="login-header">Employee Expense Management</p>
          <Card className="main-login">
            <CardBody>
              <p className="login-header">Login to your Account</p>
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
                  console.log(email, password);
                }}
              >
                Login
              </button>
              <p style={{ fontSize: "14px" }}>
                Dont have an Account?{" "}
                <a href="/signin" style={{ textDecoration: "none" }}>
                  <span
                    style={{
                      borderBottom: "2px solid hsl(214, 35%, 21%)",
                      color: "black",
                    }}
                  >
                    Register
                  </span>
                </a>
              </p>
            </CardBody>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Login;
