Exercise over parsing information coming through get, post and json data format.

A server listening port 3000 is created using express
Informaton is parsed usin app.use(....)
data is extracted from the 'req.body'

The html creates two forms submited. One sends the data via get method, the second one via post meethod

Implamenting RESTFul capabilities

Name        / Path          / Type of request         / Purpose
 
GET         /comment             / GET                     / Displays all coments

POST        /comment/new         / POST                    / Creates new comment

GET         /comment/:id         / GET                     / Displays comment by id

UPDATE      /comment/:id/edit    / PATCH                   / Edit a comment

DELETE      /comment/:id         / DELETE                  / Delete comment


New functionalities added:

Adding new comment, Edit an existing comment 

Using "uuid" npm package for generating random comments id's

Using "method-override" npm package for adding 'patch' and more methods, as query string to html. By default only GET and POST request are possible. 
The sending method must be POST while sending the queries
