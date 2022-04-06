const check = require("./utils/check-case-status.js");
const path = require("path");

check.checkCase("MSC", 2190145258, 10).then((data) => {
  data.forEach((d) => console.log(d));
});
