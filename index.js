const { exec } = require('child_process');
const QRCode = require('qrcode');
var http = require('http');
const express = require("express");
const app = express();
const { PythonShell } = require('python-shell');
const NodeWebcam = require("node-webcam");
const { spawn } = require('child_process');

const Webcam = NodeWebcam.create({});

const fileName = "my-image.jpg";
const filePath = `${__dirname}/${fileName}`;

app.get('/', (req, res) => {
  Webcam.capture(filePath, function(err, data) {
    if (err) {
      console.error(err);
      res.status(500).send('Error capturing image');
      return;
    }
    console.log(`Image captured and saved to ${filePath}`);

    const cmd = `python3 script.py Tushar.jpg my-image.jpg`;

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        res.status(500).send('Error running Python script');
        return;
      }

      console.log(`stdout: ${stdout}`);
      if (stdout.trim() === 'True') {
        QRCode.toDataURL('https://andhadhunapp.page.link/Go1D', (err, url) => {
          if (err) {
            console.error(`QRCode error: ${err}`);
            res.status(500).send('Error generating QR code');
            return;
          }

          res.send(`<img src="${url}">`);
        });
      } else {
        res.send('No match found');
      }
    });
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
