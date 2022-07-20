const fs = require("fs");
const path = require("path");
arrayCasesOut = [
  "Case Rejected Because I Sent An Incorrect Fee",
  "Case Was Rejected Because It Was Improperly Filed",
  "Card Was Delivered To Me By The Post Office",
  "Case Was Approved",
  "Case Closed Benefit Received By Other Means",
  "Card Was Picked Up By The United States Postal Service",
  "Case Rejected For Incorrect Fee And Incorrect Form Version",
  "Fees Were Waived",
  "Case Rejected Because The Version Of The Form I Sent Is No Longer Accepted",
  "Petition/Application Was Rejected For Insufficient Funds",
  "Case Was Denied",
];

const formatYmd = (date) => date.toISOString().slice(0, 10);
const today = formatYmd(new Date());

const FILE = path.join(__dirname + "/checked/cases.txt");

function isCaseInterrest(status) {
  if (arrayCasesOut.includes(status)) {
    return false;
  }
  return true;
}

function saveLastCaseStatusNumber(case_number) {}

function writerAndSaveFile(arrData) {
  const writeStream = fs.createWriteStream(FILE);
  const pathName = writeStream.path;

  arrData.forEach((data) => {
    writeStream.write(JSON.stringify(data) + `\n`);
  });

  // the finish event is emitted when all data has been flushed from the stream
  writeStream.on("finish", () => {
    console.log(`wrote all the array data to file ${pathName}`);
  });

  // handle the errors on the write process
  writeStream.on("error", (err) => {
    console.error(`There is an error writing the file ${pathName} => ${err}`);
  });

  // close the stream
  writeStream.end();
  return pathName;
}

function readFile() {
  arrJson = [];
  data = fs.readFileSync(FILE, "utf-8", (err, data) => {
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
  console.log("read done");
  return arrJson;
}

module.exports.isCaseInterrest = isCaseInterrest;
module.exports.writerAndSaveFile = writerAndSaveFile;
module.exports.readFile = readFile;
