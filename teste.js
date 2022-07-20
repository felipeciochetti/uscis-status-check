const fs = require("fs");
const funct = require("./utils/functions.js");
const path = require("path");

const CLEAN_FILE = path.join(__dirname + "/utils/checked/teste.txt");

function readFile() {
  arrJson = [];
  data = fs.readFileSync(CLEAN_FILE, "utf-8", (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        console.error("myfile does not exist");
        return;
      }

      throw err;
    }

    return data;
  });

  arrData = data.split("\n");

  for (let i = 0; i < arrData.length; i++) {
    try {
      myObject = JSON.parse(arrData[i]);

      arrJson.push(myObject);
    } catch (e) {
      console.log("error json > " + e);
    }
  }

  arrJson.forEach((element) => {
    console.log(element);
  });
}

readFile();
