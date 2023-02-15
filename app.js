const express =require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));


let items =[];


app.get("/",function(req,res){
  
    let today = new Date();
    let option = {
        weekday: "long",
        day:"numeric",
        month:"long"
    };

    let day = today.toLocaleDateString("en-US", option);

    res.render("list",{
        kindOfDay:day,
        newListItems:items
    });
});

app.post("/",(req,res)=>{

    items.push(req.body.newItem);
    res.redirect("/");

});

app.listen(3000, function(){
console.log("server started on port 3000");
});