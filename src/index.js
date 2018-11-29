#!/usr/bin/env node

const { isString } = require("util");
const fs = require("fs");
const walker = require("walker");

class LargeFileFinder {
  constructor() {
    this.find = this.find.bind(this);
  }

  find(dir, size, type, listener) {
    if (!dir) {
      console.log("please check dir.");
      return;
    }

    dir = dir.toString();
    const that = this;
    fs.access(dir, function(err) {
      if (err) {
        console.log("dir is no exist.");
        return;
      }

      that._findFiles(dir, size, type, listener);
    });
  }

  _findFiles(dir, size, type, listener) {
    walker(dir)
      .on("file", (entry, stat) => {
        if (this._checkFileType(entry, type)) {
          if (this._checkFileSize(stat, size)) {
            const kb = this._caculateSize(stat);
            if (listener && listener.onFind) {
              listener.onFind(entry, kb);
            }
          }
        }
      })
      .on("end", function() {
        if (listener && listener.didFinishFind) {
          listener.didFinishFind();
        }
      });
  }

  _checkFileSize(stat, size) {
    if (!size) {
      size = 1000;
    }
    const sizeNumber = Number(size);
    const kb = this._caculateSize(stat);
    return kb >= sizeNumber;
  }

  _caculateSize(stat) {
    return (stat.size / 1024).toFixed(1);
  }

  _checkFileType(entry, type) {
    if (!type) {
      return true;
    }

    const typeString = type.toString();
    const typeArray = typeString.split("|");
    var extStart = entry.lastIndexOf(".");
    var ext = entry
      .substring(extStart, entry.length)
      .toUpperCase()
      .replace(".", "");
    for (let type of typeArray) {
      if (type.toUpperCase() === ext) {
        return true;
      }
    }
    return false;
  }
}

module.exports = LargeFileFinder;
