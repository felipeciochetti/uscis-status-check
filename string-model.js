const fs = require('fs');
const { data } = require('./model/dataUcsis');

const str = `/Users/luizciochetti/visualcode-workspace/reviewed.txt`;

data :[];


function getForm(str) {
    if ((str===null) || (str===''))
    return false
    else  {

        form = str.substring(str.indexOf("Form")+5, str.indexOf(","))
        console.log(form);
    }
    
 }

 function isCaseIsApproved(str) {
   
    

 }


 
 fs.readFile(str, 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    setStrToModel(data);
  })