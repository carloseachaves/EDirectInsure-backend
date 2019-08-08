const functions = require('firebase-functions');
const express = require('express');
const app = express();
const cors = require("cors")
const firebase = require("firebase");
const PORT = 3000;

app.use(cors({ origin: true }));
app.use(express.json());


const firebaseConfig = {
    "apiKey": functions.config().fbd.apikey,
    "authDomain": functions.config().fbd.authdomain,
    "databaseURL": functions.config().fbd.databaseurl,
    "projectId": functions.config().fbd.projectid,
    "storageBucket": functions.config().fbd.storagebucket,
    "messagingSenderId": functions.config().fbd.messagingsenderid,
    "appId": functions.config().fbd.appid
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

app.listen(PORT, function () {
    console.log('Example app listening on port 3000!');
});

app.post('/login', function (req, res) {
    const body = req.body;
    firebase.auth().signInWithEmailAndPassword(body.user, body.pass)
    .then(function(data){
        res.json(data);
    })
    .catch(function (error) {
        res.status(500);
        res.json(error);
    });
});

app.post('/register', function (req, res) {

    const body = req.body;
    
    firebase.auth().createUserWithEmailAndPassword(body.user, body.pass)
    .then(function (data){
        res.json(data);
    })
    .catch(function (error) {
        res.status(500);
        res.json(error);
    });
});

exports.app = functions.https.onRequest(app);