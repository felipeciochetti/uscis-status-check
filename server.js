const http = require('http')
const URL = require('url')
const fs = require('fs')
const check = require('./utils/check-case-status.js')
const express = require('express')
const cors = require('cors')
 require('dotenv').config(); 
const axios = require('express')


const app = express();
const PORT = 8000

app.listen(PORT, () => console.log('Api is running on PORT ' + PORT))    


app.get('/', (req,res) => {
    res.sendFile('public/index.html',{root: __dirname});
})
app.get('/consult-cases', (req,res) => {

    console.log(req.query.number)
    if(req.query.number === undefined){
        res.send(500, 'Parameter Number is undefined ');
        return;
    }
    if(req.query.field === undefined){
        res.send(500, 'Parameter Field is undefined ');
        return;
    }
    if(req.query.qtd === undefined){
        res.send(500, 'Parameter qtd is undefined ');
        return;
    }

    const field = req.query.field; // 'MSC'
    const number = req.query.number; // number
    const qtd = req.query.qtd;  // 10

    check.checkCase(field,number,qtd).then(data => {

        res.json(data);
    
      });

    
})
