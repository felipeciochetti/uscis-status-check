const fs = require('fs');
const funct = require('./functions.js');

const formatYmd = date => date.toISOString().slice(0, 10)
const today = formatYmd(new Date()) 
const writeStream = fs.createWriteStream('/Users/luizciochetti/visualcode-workspace/'+today+'_xxxclean.txt');
const pathName = writeStream.path;

const str = `/Users/luizciochetti/visualcode-workspace/2022-03-23.txt`;



arrData = [];



function cleanFile(data){

    

    arrData = data.split('\n');


    for(let i = 0; i < arrData.length; i++){ 
        try{
        myObject = JSON.parse(arrData[i]);
        }catch(e){
            console.log('error json > ' + i);
            continue;
        }
        //console.log(myObject.status);

        if(funct.isCaseInterrest(myObject.status)){
            writeStream.write(JSON.stringify(arrData[i])+`\n`)
            console.log(JSON.stringify(myObject.status));
        }
        
    }
   // the finish event is emitted when all data has been flushed from the stream
   writeStream.on('finish', () => {
    console.log(`wrote all the array data to file ${pathName}`);
 });
 
 // handle the errors on the write process
 writeStream.on('error', (err) => {
     console.error(`There is an error writing the file ${pathName} => ${err}`)
 });
 
 // close the stream
 writeStream.end();

}


function run(){
    fs.readFile(str, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        cleanFile(data);
      })

    }
    run();