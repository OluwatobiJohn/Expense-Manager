import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./helper/firebase";
import MetaTags from "react-meta-tags";
import { Container, Row, Card, CardBody, Modal, ModalBody } from "reactstrap";
import { MoonLoader } from "react-spinners";
import Button from "./Buttons";
import ExpenseManager from "./ExpenseManager";
import Profile from "./Profile";
import Info from "./Info";

const MainOverview = () => {
  const [openAddMenu, setOpenAddMenu] = useState(false);
  const [status, setStatus] = useState("expenseManager");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const logoutUser = () => {
    auth
      .signOut()
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (!user) navigate("/login");
      setLoading(false);
    });
  }, []);
  return (
    <>
      <React.Fragment>
        <MetaTags>
          <title>Main Overview</title>
        </MetaTags>
        {loading ? (
          <div className="login-cont">
            <MoonLoader color="white" loading={loading} size={40} />
          </div>
        ) : (
          <div className="dashboard-main">
            <Container>
              <>
                <div className="dashboard-header">
                  <p className="dashboard-header-title">
                    Employee Expense Management
                  </p>
                  <button
                    className="login-btn"
                    style={{ marginTop: "0", marginRight: "10px" }}
                    onClick={() => {
                      logoutUser();
                    }}
                  >
                    Log Out
                  </button>
                </div>
                <div>
                  <Card className="dashboard-items">
                    <CardBody style={{ padding: "20px" }}>
                      <Row className="tab-btn-row">
                        <Button
                          tab
                          active={status === "expenseManager"}
                          onClick={() => setStatus("expenseManager")}
                        >
                          Expense Manager
                        </Button>
                        <Button
                          tab
                          active={status === "profile"}
                          onClick={() => setStatus("profile")}
                        >
                          Profile
                        </Button>
                        <Button
                          tab
                          active={status === "info"}
                          onClick={() => setStatus("info")}
                        >
                          Info
                        </Button>
                      </Row>
                      {status === "expenseManager" && <ExpenseManager />}
                      {status === "profile" && <Profile />}
                      {status === "info" && <Info />}
                    </CardBody>
                  </Card>
                </div>
              </>
            </Container>
          </div>
        )}
      </React.Fragment>
      <Modal
        isOpen={openAddMenu}
        toggle={() => {
          setOpenAddMenu(!openAddMenu);
        }}
      >
        <ModalBody>
          <p>This is a model</p>
        </ModalBody>
      </Modal>
    </>
  );
};

export default MainOverview;
