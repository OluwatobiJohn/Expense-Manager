import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Modal,
  ModalBody,
  Input,
  Spinner,
} from "reactstrap";
import DataTable from "react-data-table-component";
import moment from "moment";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { db } from "./helper/firebase";

const ExpenseManager = () => {
  const [item, setItem] = useState("");
  const [description, setDescription] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [getLoading, setgetLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [fromDate, setfromDate] = useState("");
  const [toDate, settoDate] = useState("");
  const [minPrice, setminPrice] = useState(0);
  const [maxPrice, setmaxPrice] = useState(0);
  const [exDate, setexDate] = useState("");
  const [dbData, setDbData] = useState([]);
  const getData = async () => {
    setgetLoading(true);
    const snapshot = await db.collection("Expenses").get();
    const expenses = [];
    return snapshot.docs.map((doc) => {
      console.log(doc.data());
      expenses.push(doc.data());
      setgetLoading(true);
      setDbData(expenses);
    });
  };
  const expenses = [];
  const filterDate = [];
  console.log(expenses);

  const clearFilter = () => {
    setfromDate(null);
    settoDate(null);
    setminPrice(0);
    setmaxPrice(0);
    getData();
  };
  const filterData = async () => {
    setgetLoading(true);
    const snapshot = await db.collection("Expenses").get();

    const data = snapshot.docs
      .filter((doc) =>
        fromDate
          ? doc.data().Date >= moment(fromDate, "M/D/YYYY H:mm").valueOf()
          : true
      )
      .filter((doc) =>
        toDate
          ? doc.data().Date <= moment(toDate, "M/D/YYYY H:mm").valueOf()
          : true
      )
      .filter((doc) =>
        minPrice ? doc.data().Price >= parseInt(minPrice) : true
      )
      .filter((doc) =>
        maxPrice ? doc.data().Price <= parseInt(maxPrice) : true
      )
      .map((doc) => doc.data());
    setDbData(data);
    console.log(snapshot.docs);
  };
  const myFunction = () => {
    let x = document.getElementById("myDIV");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  };
  const successModal = () => {
    let x = document.getElementById("myDIV2");

    x.style.display = "block";
  };
  const closeModal = () => {
    let x = document.getElementById("myDIV");
    let y = document.getElementById("myDIV2");

    x.style.display = "none";
    y.style.display = "none";
  };
  const addUser = async () => {
    setAddLoading(true);
    const newExpence = await db.collection("Expenses").add({
      Item: item,
      Description: description,
      Price: parseInt(price),
      Date: moment(exDate, "M/D/YYYY H:mm").valueOf(),
    });
    if (newExpence) {
      getData();
      successModal();
      setAddLoading(false);
    }
  };
  const selectRow = {
    mode: "checkbox",
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(dbData);

  const columns = [
    {
      name: "Item",
      selector: (row) => row.Item,
      sortable: true,
    },
    {
      name: "Price",
      selector: (row) => `$${row.Price}`,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.Description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => moment(row.Date).format("M/D/YYYY"),
      sortable: true,
    },
  ];
  return (
    <>
      <div
        className="expense-cont"
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 6fr",
          height: "80vh",
          marginTop: "40px",
          overflow: "auto",
        }}
      >
        <div style={{ height: "100%" }}>
          <div
            style={{
              backgroundColor: "#E5E8EB",
              height: "700px",
              borderRadius: "15px",
              marginRight: "25px",
              padding: "20px",
            }}
          >
            <Row
              className="label-row"
              style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
            >
              <label>From Date</label>
              <DatePicker
                className="form-control"
                placeholder="Enter Date"
                dateFormat="dd-MM-yyyy"
                selected={fromDate}
                value={fromDate}
                onChange={(date) => {
                  setfromDate(date);
                }}
              />
            </Row>
            <Row
              className="label-row"
              style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
            >
              <label>To Date</label>
              <DatePicker
                className="form-control"
                placeholder="Enter Date"
                dateFormat="dd-MM-yyyy"
                selected={toDate}
                value={toDate}
                onChange={(date) => {
                  settoDate(date);
                }}
              />
            </Row>
            <Row
              className="label-row"
              style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
            >
              <label>Min Amount</label>
              <Input
                className="form-control"
                placeholder="Enter Amount"
                value={minPrice}
                onChange={(e) => setminPrice(e.currentTarget.value)}
              ></Input>
            </Row>
            <Row
              className="label-row"
              style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
            >
              <label>Max Amount</label>
              <Input
                className="form-control"
                placeholder="Enter Amount"
                value={maxPrice}
                onChange={(e) => setmaxPrice(e.currentTarget.value)}
              ></Input>
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
                clearFilter();
              }}
            >
              Clear Filter
            </button>
            <button
              onClick={() => {
                filterData();
              }}
              className="login-btn"
            >
              Filter Data
            </button>
          </div>
        </div>
        <div>
          <div
            style={{
              height: "100%",
            }}
          >
            <DataTable columns={columns} data={dbData} />
            <button
              onClick={() => {
                myFunction();
              }}
              className="plus"
            ></button>
          </div>
        </div>
      </div>
      <div
        tabindex="-1"
        id="myDIV"
        className="modal-div"
        style={{ display: "none" }}
      >
        <p
          style={{ fontWeight: "bold", fontSize: "18px", marginBottom: "40px" }}
        >
          Enter Details of your Expense
        </p>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Item</label>
          <Input
            className="form-control"
            placeholder="Enter Item"
            value={item}
            onChange={(e) => setItem(e.currentTarget.value)}
          ></Input>
        </Row>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Description</label>
          <Input
            className="form-control"
            placeholder="Enter Description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          ></Input>
        </Row>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Price</label>
          <Input
            className="form-control"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.currentTarget.value)}
          ></Input>
        </Row>
        <Row
          className="label-row"
          style={{ color: "black", fontSize: "16px", marginBottom: "20px" }}
        >
          <label>Date</label>
          <DatePicker
            className="form-control"
            placeholder="Enter Date"
            dateFormat="dd-MM-yyyy"
            selected={exDate}
            value={exDate}
            onChange={(date) => {
              setexDate(date);
            }}
          />
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
            addUser();
          }}
        >
          {addLoading ? (
            <Spinner color="primary">Loading...</Spinner>
          ) : (
            "Add Expense"
          )}
        </button>
      </div>
      <div
        tabindex="-2"
        id="myDIV2"
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
            Item Added
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

export default ExpenseManager;
