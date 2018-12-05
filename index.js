const express =require('express')
const app =express();
const path = require('path');
const port=8090;
var bodyParser = require('body-parser');
const fetch =require('node-fetch');

var mongoose = require('mongoose');
require('./config/dbconfig');

const user=require('./model');

app.use(express.static(path.join(__dirname, "/template")));

//app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.post('/login-with-facebook',async (req ,res)=>{
    const{ accessToken ,userID,name } = req.body
console.log("somthing data find",userID,accessToken,name)
   const response=await fetch(`https://graph.facebook.com/v3.1/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`)
   console.log("facebook pas",response)
   const json =await response.json()

   console.log("facebook name data find",json.name);
   if(json.id === userID)
   {
console.log('json.')
    const result = await user.findOne({facebookID : userID })
        if(result){
            console.log('all result find ',result);
            res.json({status:'ok', data:'you are logged in'})
        }
        else{
            const person= new user({
                name:json.name,
                facebookID:userID,
                accessToken
            })
            await person.save()
            res.json({status:'ok', data: 'you are registerd'})
        }


}else{
    //odifjsdoi
    res.json({status:'ok', data: 'dont try to this'})
   }
})


app.listen(port , ()=>{
	console.log('server is started at port ' + port);
});