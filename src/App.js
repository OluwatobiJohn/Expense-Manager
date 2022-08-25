import React, { useHistory } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Components/Login";
import Signin from "./Components/Signin";
import MainOverview from "./Components/MainOverview";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/login" />}
          />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signin" element={<Signin />}></Route>
          <Route path="/dashboard" element={<MainOverview />}></Route>
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
