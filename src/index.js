const express = require('express');
const mysql = require('mysql');
const {randomBytes} = require('crypto');

//database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodedemo'
});

connection.connect(function(error){
    if(!!error){
        console.log('Error');
    }else{
        console.log('Connected');
    }
});

// app.get('/', function(req,res){
//   connection.query("Select *from sampleDB");
//     if(!!error){
//         console.log('Error in the query');
//   }else {
//       console.log('Successful query')
//   }
// });

const posts = {};

const app = express();

app.use(express.json());

app.get('/posts', (req, res)=> {
    return res.send(posts);
});

app.post("/posts", (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {id, title};

    res.send(posts[id]);
})

app.path("/posts/:id",(req,res)=>{
    const id = req.params.id;
    const post = posts[id];

    if(!post) res.send({"message" : "Post not found"});

    const {title} = req.body;
    post.title = title;

    posts[id] = post;

    res.send(post);
});

app.delete("/posts/:id", (req,res)=>{
    const id = req.params.id;
    delete posts[id];
    res.send({});
})

app.listen(8000, (req,res)=> {
    console.log('Running on Port 8000');
})