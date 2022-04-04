
const check = require('./utils/check-case-status.js');



   check.checkCase('MSC',2190145258,10).then(data => {

    data.forEach( d => console.log(d ))


  });


