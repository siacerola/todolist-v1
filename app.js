const express =require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


let items =["Buy Food","Cook Food","Eat Food"];
let workItems =[];

app.get("/",function(req,res){
  
    let today = new Date();
    let option = {
        weekday: "long",
        day:"numeric",
        month:"long"
    };

    let day = today.toLocaleDateString("en-US", option);

    res.render("list",{
        listTitle:day,
        newListItems:items
    });
});

app.post("/",(req,res)=>{
    // console.log(req.body)

    let item = req.body.newItem;
    if(req.body.list==="Work"){
        workItems.push(item);
        res.redirect("/work")
    } else {
        items.push(req.body.newItem);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list", {listTitle: "Work List",newListItems:workItems});
});

app.post("/work",function(req,res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});

app.listen(3000, function(){
console.log("server started on port 3000");
});