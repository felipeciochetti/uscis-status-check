
const puppeteer = require('puppeteer')
const fs = require('fs');
const funct = require('./functions.js');

require('dotenv').config()


const url = `https://egov.uscis.gov/casestatus/mycasestatus.do?appReceiptNum=`


var arrData = [];


async function checkCase(center , numberIni , qtCheckCases  ){


    const browser = await puppeteer.launch();
    const page = await browser.newPage()


    let count = 1;

    for(i  = 0; i <  qtCheckCases ; i++){

        try{

        processNumber =  center +  parseInt( numberIni + i );

        console.log("going to URL , searching... > " + processNumber  + " - "  + count++ )


        await page.goto(url  + processNumber)
        
          
          await page.waitForSelector('.rows').catch(t => console.log("Not able to load status screen"))
         
          
          const status = removeTags(await page.$eval('h1', el => el.innerText))
          const form =  getForm(removeTags(await page.$eval('p', el => el.innerText)))
      
      
          if(!funct.isCaseInterrest(status) ){
              continue;
          }
      
          let data = {
              "status" : status,
              "form" : form,
              "caseNumber" : processNumber  
          }

          //console.log(data)
          arrData.push(data);


        }catch(e){
            console.log(e);
         }
    }



    return arrData;

}

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




 module.exports.checkCase = checkCase;