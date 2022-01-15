//In the name od Allah
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

mongoose.connect("mongodb+srv://parvesh:parvesh@cluster0.rknye.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")

var today = new Date()
     
var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
   }
   today = today.toLocaleDateString("en-US", options)
// const todayDate = require(__dirname + "/date.js")
app.set("view engine", "ejs")
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
const itemSchema=new mongoose.Schema({      //schema
  name:String
}) 
const input=mongoose.model("input",itemSchema)    //collection
app.get('/', (req, res) => {
   input.find((err,i)=>{
      res.render("index", { date: today, listTitle: "ToDo", todos: i })    
  })
})
app.post('/', function (req, res) {
  console.log(req.body);
  const itemName=req.body.todo
  const itemNameDocument=new input({
    name:itemName
  })
  itemNameDocument.save()
  res.redirect("/")
})
app.post('/delete', function (req, res) {
console.log(req.body.checkbox );
var deleteId=req.body.checkbox 
input.findByIdAndDelete(deleteId,()=>{})
res.redirect("/")
})
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);