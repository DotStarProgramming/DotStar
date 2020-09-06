const express = require('express');
const cors = require('cors')
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const http = require('http');
const https = require('https');
const fs = require('fs');

const app = express();

require('dotenv').config()

// Certificate
const privateKey = fs.readFileSync(process.env.PRIV, 'utf8');
const certificate = fs.readFileSync(process.env.CERT, 'utf8');
const ca = fs.readFileSync(process.env.CHAIN, 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(bodyParser.text());
app.use(cors(corsOptions))

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'main/build')));

// Handles any requests that don't match the ones above
const root = require('path').join(__dirname, 'main', 'build')
app.use(express.static(root));
app.post('/api/request-consult', function (req, res) {
    let transport = nodemailer.createTransport({
        host: 'mail.dotstar.ca',
        port: 587,
        auth: {
            user: process.env.EMAIL_USER_NAME,
            pass: process.env.EMAIL_USER_PASSWORD
        }
    });

    let body = JSON.parse(req.body);
    res.json({
        success: true,
        message: req.description
    })

    let textBody = `Thank you for you consultation request!

You will be emailed shortly by a skilled solutions engineer to set up a date and time for your consultation.

We look forward to working with you!

Feel free to reply to this email if you have any more questions.

Copy of request:

${body.description}
    `

    const message = {
        from: `Dot Star ${process.env.EMAIL_USER_NAME}`, // Sender address
        to: body.email,         // List of recipients
        subject: `Consultation request for ${body.name}`, // Subject line
        text: textBody // Plain text body
    };

    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });




    let textBody2 = `${body.description}`

    const message2 = {
        from: 'office@dotstar.ca', // Sender address
        to: 'office@dotstar.ca',         // List of recipients
        subject: `New consultation request from ${body.name}`, // Subject line
        text: textBody2 // Plain text body
    };

    transport.sendMail(message2, function (err, info) {
        if (err) {
            console.log(err)
        } else {
            console.log(info);
        }
    });
})
app.get("*", (req, res) => {
    res.sendFile('index.html', { root });
})

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(443);

console.log('App is listening on port ' + 443);

// Redirect from http port 80 to https
http.createServer(function (req, res) {
    res.writeHead(301, { "Location": "https://" + req.headers['host'] + req.url });
    res.end();
}).listen(80);

console.log('Https redirect is listening on port ' + 80);
