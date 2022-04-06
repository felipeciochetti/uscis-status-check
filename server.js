const http = require("http");
const URL = require("url");
const fs = require("fs");
const check = require("./utils/check-case-status.js");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const axios = require("express");
const path = require("path");
const fc = require("./utils/functions.js");

const app = express();
const PORT = 8000;

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.listen(PORT, () => console.log("Api is running on PORT " + PORT));

app.get("/", (request, response) =>
  response.render("index", {
    data: [],
    pathName: "",
  })
);

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
