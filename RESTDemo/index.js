const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require ('method-override');
const { v4: uuid4 } = require('uuid'); // destructure v4 from the uuid and then change name to uuid4

app.use(express.urlencoded({ extended:true})) // tells Express to parse information coming from URL encoded request body
app.use(express.json()); // tells express to parse data coming from json file
app.use(methodOverride('_method')); // adds possibility to send patch and delete requests. HTML can only send patch and post requests 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


//***************************/
// faking a database
let comments = [
    {
        // id: '1', // issue with id: 1 and id: '1' !!! id:1 is different then id: 1 even when parsed
        id: uuid4(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid4(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid4(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid4(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]
// end faking database
//********************/


app.get('/comments', (req,res) => {
    res.render('comments/index', {comments}); 
    // line above renders index.ejs and passes the data as an object to the rendered tepmplate 
})
app.get('/comments/new', (req,res) => {
    res.render('comments/new.ejs'); 
    // line above renders index.ejs and passes the data as an object to the rendered tepmplate 
})

app.post('/comments', (req,res) => {
    const {username, comment} = req.body; // extracts usename and comment from req.body. Only the needed data is requested 
    comments.push ({id: uuid4(), username, comment});
    res.redirect ('/comments');
})

app.get('/comments/:id', (req,res) =>{
const {id} = req.params; // extracts id from 'request'
console.log(id);
const comment = comments.find(c => c.id == id); // finds the comment by id
res.render ('comments/show.ejs', {comment});
})

app.get('/comments/:id/edit', (req,res) =>{
    const {id, username} = req.params; // extracts id from the 'request'
    const comment = comments.find( c => c.id == id); // finds the responding comment and assings the object in varaible 'comment'. This 'comment' is object too 
    res.render (`comments/edit.ejs`, {comment});
}) 

app.patch ('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find (c => c.id == id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
})


// First part of the exercise. Not importanrt for the comment exercise 
app.post('/tacos', (req,res) => {
    const {meat, qty} = req.body;
    res.send (`from: ${meat} tacos, ordered: ${qty} pcs.`);
})

app.get('/tacos', (req,res) => {
    res.send ("GET /tacos response")
})

app.listen (3000, () => {
    console.log ("On port 3000");
})