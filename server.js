const http = require("http");
const URL = require("url");
const fs = require("fs");
const check = require("./utils/check-case-status.js");
const checkMyCases = require("./utils/check-my-cases-status.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("express");
const path = require("path");
const fc = require("./utils/functions.js");
const bodyParser = require("body-parser");
const { json } = require("express/lib/response");

const app = express();
const PORT = 8000;

//app.set("views", path.resolve(__dirname, "views"));
//app.set("view engine", "ejs");

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(express.static(path.join(__dirname, "./uscis-front-end")));
// API root

app.listen(PORT, () => console.log("Api is running on PORT " + PORT));

app.get("/welcome", (req, res) => {
  res.send(200, "Welcome to Ucsis case tracker");
  return;
});

app.get("/cases", (request, response) => {
  console.log("get cases  ");
  arrData = fc.readFile();
  response.json(arrData);
});

app.get("/consult-my-cases", (request, response) =>
  checkMyCases.run(fc.readFile()).then((data) => {
    response.render("index", { data: data, pathName: "" });
  })
);

app.post("/consult-case", (request, response) => {
  data = [];
  data.push(request.body);

  checkMyCases.run(data).then((res) => {
    response.json(res);
  });
});

app.post("/save-cases", (request, response) => {
  console.log("saving cases  ");
  data = [];
  data = request.body;
  console.log("saving cases  ");
  fc.writerAndSaveFile(data);
});

app.get("/consult-cases", (req, res) => {
  console.log(req.query.number);
  if (req.query.number === undefined) {
    res.send(500, "Parameter Number is undefined ");
    return;
  }
  if (req.query.field === undefined) {
    res.send(500, "Parameter Field is undefined ");
    return;
  }
  if (req.query.qtd === undefined) {
    res.send(500, "Parameter qtd is undefined ");
    return;
  }

  const field = req.query.field; // 'MSC'
  const number = req.query.number; // number
  const qtd = req.query.qtd; // 10

  check.checkCase(field, number, qtd).then((data) => {
    let pathName = fc.writerAndSaveFile(data);
    res.render("index", { data: data, pathName: pathName });
  });
});
