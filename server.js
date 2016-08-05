var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var books = [
    {name:'nodejs',price:20,id:1},
    {name:'vuejs',price:50,id:2},
    {name:'angularjs',price:100,id:3},
]

app.use(express.static(path.join(__dirname,'node_modules')))
app.get('/',function (req,res) {
    res.sendFile('./resource.html',{root:__dirname});
});
app.get('/books',function (req,res) {
    res.send(books);
});
app.delete('/books/:id',function (req,res) {
    books = books.filter(function (item) {
         return item.id != req.params.id
    });
    res.send(books);
});
app.put('/books/:id',function (req,res) {
   //console.log(req.params.id,req.body.data);

    books = books.map((item)=>{
        if(item.id == req.params.id){
            return req.body.data
        }
        return item;
    })
    res.send(books);
});
app.listen(8080);