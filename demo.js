#! /usr/bin/env node

const LargeFileFinder = require("./src/index");
const finder = new LargeFileFinder();

finder.find(
  "/Users/catchzeng/Documents/Code/Github/JoystickView",
  5,
  "swift|png",
  {
    onFind(entry, size) {
      console.log("onFind: " + size + "k " + entry);
    },
    didFinishFind() {
      console.log("didFinishFind");
    }
  }
);
