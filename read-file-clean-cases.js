const funct = require('./functions.js');
const comparable = require('./comparable-search.js');
const fs = require('fs');


const CLEAN_FILE  = '/Users/luizciochetti/visualcode-workspace/clean-cases.txt';


async function runCleanCases (arrData) {


    comparable.run(arrData);

   




   } 

   fs.readFile(CLEAN_FILE, 'utf8' , (err, data) => {
           

    console.log('read file...');
    if (err) {
      console.log(err)
      return
    }
   
    
    arrJson = [];
    arrData = data.split('\n');

    
    for(let i = 0; i < arrData.length; i++){ 
        try{
        myObject = JSON.parse(arrData[i]);
        arrJson.push(myObject)

        }catch(e){
            console.log('error json > ' + i);
            continue;
        }
       

        }

        runCleanCases(arrJson);

  })
