//#region JAVASCRIPT
var binary = require('node-pre-gyp');
var path = require('path');
var binding_path = binary.find(path.resolve(path.join(__dirname,'./package.json')));
var udev = require(binding_path);
var EventEmitter = require('events').EventEmitter;


var getDetailedNodeChain = function (node: any) {
  var result: Array<any> = [], extra;
  while (node && node.hasOwnProperty('syspath')) {
    extra = udev.getSysattrBySyspath(node.syspath);
    for (var key in extra) {
      if (extra.hasOwnProperty(key)) {
        node[key] = extra[key];
      }
    }
    result.push(node);
    node = udev.getNodeParentBySyspath(node.syspath);
  }
  return result;
};


var getNodeDetailsSummary = function (node: any) {
  var result: {
      [index: string]: any
  } = {},
    nodes = getDetailedNodeChain(node),
    key;
  while (nodes.length != 0) {
    node = nodes.pop();
    for (key in node) {
      if (node.hasOwnProperty(key)) {
        if (!result.hasOwnProperty(key)) {
          result[key] = [];
        }
        result[key].push(node[key]);
      }
    }
  }
  return result;
};


udev.Monitor.prototype.__proto__ = EventEmitter.prototype;


module.exports = {
  monitor: function (subsystem: any) {
    return new udev.Monitor(subsystem);
  },
  list: udev.list,
  getNodeParentBySyspath: udev.getNodeParentBySyspath,
  getSysattrBySyspath: udev.getSysattrBySyspath,
  getNodeChain: getDetailedNodeChain,
  getNodeDetails: getNodeDetailsSummary
};
//#endregion