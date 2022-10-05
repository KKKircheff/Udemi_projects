const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended:true})) // tells Express to parse information coming from URL encoded request body
app.use(express.json()); // tells express to parse data coming from json file
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

//***************************/
// faking a database
let comments = [
    {
        
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
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
    comments.push ({username, comment});
    res.send('IT worked');
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