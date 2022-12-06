
const https = require("https");
const express = require("express");
const fs = require("fs");
const app = express();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const options = {
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
};

app.get('/download', function(req, res){
    let file = '4096.txt';
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.download(file);
    res.send
});

app.get('/empty', function(req, res){
    const currTime = Date.now();
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.json({ id: currTime.valueOf() - Date.now() });
});

app.post("/upload", upload.array("defaultData"), uploadFile);

function uploadFile(req, res) {
    console.log(req.body);
    console.log(req.defaultData);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Accept");
    res.json({ message: "Successfully uploaded file" });
}

https.createServer(options, app).listen(3000);
