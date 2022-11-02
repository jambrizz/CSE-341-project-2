//creates a variable called express and sets it to the express module
const express = require('express');

//creates a variable to parse the body of the request
const bodyParser = require('body-parser');

//creates a variable to require CORS will move it to its own middleware file
const cors = require('cors');

//creates a variable to require the connection.js file in the database folder
const mongodb = require('./db/connection');

//variable specify the local port or the production port
const port = process.env.PORT || 3000;

//creates a variable called app and sets it to the express module
const app = express();

app 
    .use(bodyParser.json())
    .use(cors())
    .use((req, res, next) =>{
        res.setHeader('Access-Control_Allow-Origin', '*');
        next();
    })
    .use('/', require('./routes/index'));

const db =  require('./models/index.js');
db.mongoose
    .connect(db.uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(port, () => {
            console.log(`Database connected and listening on port ${port}`);
        });
    })
    .catch((err) =>{
        console.log(err);
        process.exit();
    });
