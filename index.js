const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'main/build')));

// Handles any requests that don't match the ones above
const root = require('path').join(__dirname, 'main', 'build')
app.use(express.static(root));
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

const port = process.env.PORT || 80;
app.listen(port, "0.0.0.0");

console.log('App is listening on port ' + port);
