const express = require("express");
const app = express();
const path = require("path");
const redditData = require ('./data.json');

/* serving css styles from public folder without handeling global 
app.use(express.static('public')); */

/* serving css styles from public folder WITH handeling global  */
app.use(express.static(path.join(__dirname, 'public'))); 


/* const testLiteral = 'soccer'
   console.log(redditData[testLiteral]); 
--- getting data from soccer: property with variable ---- */ 

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.get ('/r/:subreddit', (req,res) => {
  const {subreddit} = req.params; 
  const data = redditData[subreddit];
  if (data) {
  res.render("subreddit.ejs", {...data});
} else { 
res.render("notfound.ejs", {subreddit});
}
});

app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.get("/random", (req, res) => {
  const randomNum = Math.floor(Math.random() * 10) + 1;

  res.render("random.ejs", {
    randomSomething: randomNum,
  }); /* sending html page + object with random number to be rendered as a page*/
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
