var http = require('http');
const express = require("express");
const app = express();
const { PythonShell } = require('python-shell');
const NodeWebcam = require("node-webcam");
const { spawn } = require('child_process');
const { exec } = require('child_process');

const Webcam = NodeWebcam.create({});

const fileName = "my-image.jpg";
const filePath = `${__dirname}/${fileName}`;

app.listen(3000,()=>{
  Webcam.capture(filePath, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image captured and saved to ${filePath}`);

      // const args = ['Tushar.jpg', 'my-image.jpg'];
      // const pythonProcess = spawn('python3', ['my_script.py', ...args]);
      // pythonProcess.stdout.on('data', (data) => {
      //   console.log(`Python function output: ${data}`);
      // });
      // pythonProcess.on('close', (code) => {
      //   console.log(`Python process exited with code ${code}`);
      // });

      const cmd = `python3 script.py Tushar.jpg my-image.jpg`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  // console.error(`stderr: ${stderr}`);
});
    }
  });
});
