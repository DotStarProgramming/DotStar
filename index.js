const express = require('express');
const cors = require('cors')
const path = require('path');

const app = express();

require('dotenv').config()

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'main/build')));

// Handles any requests that don't match the ones above
const root = require('path').join(__dirname, 'main', 'build')
app.use(express.static(root));
app.post('/api/request-consult', function (req, res) {
    res.json({
        success: true,
        message: "hi"
    })
})
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

const port = process.env.PORT || 80;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
