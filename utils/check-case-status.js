const puppeteer = require("puppeteer");
const fs = require("fs");
const funct = require("./functions.js");

require("dotenv").config();

const url = `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=`;

const formatYmd = (date) => date.toISOString().slice(0, 10);
const today = formatYmd(new Date());

var arrData = [];

async function checkCase(center, numberIni, qtCheckCases) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  let count = 1;

  arrData = [];

  arrData = funct.readFile();

  for (i = 0; i < qtCheckCases; i++) {
    try {
      const x = parseInt(+numberIni + i);
      processNumber = center + x;

      console.log(
        "going to URL , searching... > " + processNumber + " - " + count++
      );

      await page.goto(url + processNumber);

      await page
        .waitForSelector(".rows")
        .catch((t) => console.log("Not able to load status screen"));

      const status = removeTags(await page.$eval("h1", (el) => el.innerText));
      const form = getForm(
        removeTags(await page.$eval("p", (el) => el.innerText))
      );

      if (!funct.isCaseInterrest(status)) {
        continue;
      }

      let data = {
        status: status,
        form: form,
        caseNumber: processNumber,
        date: today,
      };

      arrData.push(data);
    } catch (e) {
      console.log(e);
    }
  }

  return arrData;
}

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
      return "unknow";
      form = str.substring(str.indexOf("Form") + 5, str.indexOf(","));
      return form;
    } catch (e) {}
  }
}

module.exports.checkCase = checkCase;
