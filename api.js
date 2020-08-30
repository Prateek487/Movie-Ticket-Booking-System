var express = require('express');
var bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
require("./app/routes/booking.routes.js")(app);


app.get('/',(req,res)=>{
    res.json({message : "Welcome to my rest api"});
});
app.listen(3000,()=>{
    console.log("Server is Runing");
});