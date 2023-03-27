var http = require('http');
const express = require("express");
const app = express();
const { PythonShell } = require('python-shell');
const NodeWebcam = require("node-webcam");
const { spawn } = require('child_process');

const Webcam = NodeWebcam.create({});

const fileName = "my-image.jpg";
const filePath = `${__dirname}/${fileName}`;

app.listen(3000,()=>{
  Webcam.capture(filePath, function(err, data) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Image captured and saved to ${filePath}`);
    }
  });

  // let options = {
  //   args: ['Tushar.jpg', 'my-image.jpg']
  // };

  const args = ['Tushar.jpg', 'my-image.jpg'];
  const pythonProcess = spawn('python3', ['my_script.py', ...args]);
  let output = '';
  pythonProcess.stdout.on('data', (data) => {
    output += data.toString();
  });
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
    console.log(`Python function output: ${output}`);
  });
  // PythonShell.run('script.py', options, function (err, results) {
  //   if (err) throw err;
  //   console.log('results:', results);

  // });
});