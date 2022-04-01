const puppeteer = require('puppeteer')
const fs = require('fs');
const funct = require('./functions.js');

require('dotenv').config()



const CLEAN_FILE  = '/Users/luizciochetti/visualcode-workspace/clean-cases.txt';

const url = `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=`




function removeTags(str) {
    if ((str===null) || (str===''))
    return false
    else  {
        
        return str.replace('+','').trim().replace(/\r?\n|\r/g, " ").replace( /(<([^>]+)>)/ig, '')
       
    
    
    
    }
    
 }
 function getForm(str) {
    if ((str===null) || (str===''))
    return false
    else  {
        try{
        form = str.substring(str.indexOf("Form")+5, str.indexOf(","))
        return form;
    }catch(e){
        return 'unknow'
    }
    }
    
 }
async function run (arrCases) {
   
    console.log('start...')

    const browser = await puppeteer.launch();
    const page = await browser.newPage()

    var arrData = [];
  
    let count = 1;
    let i = 0;
    try{

    for(; i < arrCases.length; i++){
        

    processNumber = arrCases[i].caseNumber;

    console.log("going to URL , searching... > " + processNumber  + " - "  + count++ )
    await page.goto(url + processNumber)
   // await page.$eval('#receipt_number', (el,receipt) => el.value = `${receipt}`, processNumber)
   // await page.click('input[type="submit"]')
    
    await page.waitForSelector('.rows').catch(t => console.log("Not able to load status screen"))
   

    
    const status = removeTags(await page.$eval('h1', el => el.innerText))
    const form =  getForm(removeTags(await page.$eval('p', el => el.innerText)))


        

    if(status === arrCases[i].status ){
        console.log('same')
    }else{
        console.log('****************** to > ' + arrCases[i].status + ' for > ' + status);
    }

    let data = {
        "status" : status,
        "form" : form,
        "caseNumber" : processNumber  
    }

    arrData.push(data);
    
}

}catch(e){
   console.log(e)
}
    
    



browser.close()
    
    
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
            console.log('error json > ' + e);
            continue;
        }
       

        }



        run(arrJson);

  })