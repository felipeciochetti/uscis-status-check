const puppeteer = require("puppeteer");
const fs = require("fs");
const funct = require("./functions.js");
const { toUnicode } = require("punycode");

require("dotenv").config();

const CLEAN_FILE = "/Users/luizciochetti/visualcode-workspace/clean-cases.txt";

const url = `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=`;

const formatYmd = (date) => date.toISOString().slice(0, 10);
const today = formatYmd(new Date());

function removeTags(str) {
  if (str === null || str === "") return false;
  else {
    return str
      .replace("+", "")
      .trim()
      .replace(/\r?\n|\r/g, " ")
      .replace(/(<([^>]+)>)/gi, "");
  }
}
function getForm(str) {
  if (str === null || str === "") return false;
  else {
    try {
      form = str.substring(str.indexOf("Form") + 5, str.indexOf(","));
      return form;
    } catch (e) {
      return "unknow";
    }
  }
}

function checkMyCases() {
  data = run(funct.readFile());
  console.log("return data ...");
  return data;
}

async function run(arrCases) {
  console.log("start...");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  var arrData = [];

  let date_update;

  let count = 1;
  let i = 0;
  try {
    for (; i < arrCases.length; i++) {
      processNumber = arrCases[i].caseNumber;

      console.log(
        "going to URL , searching... > " + processNumber + " - " + count++
      );
      await page.goto(url + processNumber);
      // await page.$eval('#receipt_number', (el,receipt) => el.value = `${receipt}`, processNumber)
      // await page.click('input[type="submit"]')

      await page
        .waitForSelector(".rows")
        .catch((t) => console.log("Not able to load status screen"));

      const status = removeTags(await page.$eval("h1", (el) => el.innerText));
      const form = getForm(
        removeTags(await page.$eval("p", (el) => el.innerText))
      );

      let new_status = "";

      if (arrCases[i].hasOwnProperty("date")) {
        date_update = arrCases[i].date;
      }

      if (status === arrCases[i].status) {
        console.log("same");
      } else {
        console.log(
          "****************** to > " + arrCases[i].status + " for > " + status
        );
        new_status = status;
        date_update = today;
      }

      let data = {
        status: status,
        form: form,
        caseNumber: processNumber,
        new_status: new_status,
        date: date_update,
      };

      arrData.push(data);
    }
  } catch (e) {
    console.log(e);
    return;
  }

  console.log("finish");
  browser.close();

  return arrData;
}

module.exports.checkMyCases = checkMyCases;

module.exports.run = run;
