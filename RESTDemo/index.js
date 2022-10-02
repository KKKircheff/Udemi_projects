const express = require('express');
const app = express();

app.use(express.urlencoded({ extended:true})) // tells Express to parse information coming from URL encoded request body
app.use(express.json()); // tells express to parse data coming from json file


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