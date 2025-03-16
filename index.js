const express = require("express");
const crypto = require("crypto");
const Worker = require("worker_threads").Worker;
const app = express();

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    this.on = function () {
      let counter = 0;

      while (counter < 1e9) {
        counter++;
      }

      postMessage(counter);
    };
  });

  worker.on = function (message) {
    console.log(message);
    res.send(`${message}`);
  };

  worker.postMessage();
});

app.get("/fast", (req, res) => {
  res.send("This is fast!");
});

app.listen(3000);
