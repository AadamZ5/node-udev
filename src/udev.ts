export interface UdevDevice{ //Definition based on https://kernel.googlesource.com/pub/scm/linux/hotplug/udev/+/refs/tags/176/src/libudev-device.c
    parent_device?: UdevDevice;
    syspath: string;
    devpath: string;
    sysname: string;
    sysnum: string;
    devnode: string;
    devnode_mode: number;
    subsystem: string;
    devtype: string;
    driver: string;
    action?: string;
    devpath_old: string;
    id_filename: string;
    //envp: string;             // What is this...?
    //monitor_buf: string;      // And this?
    //monitor_buf_len: number;  // ?
    devlinks_list: any[];
    properties_list: any[];
    sysattr_value_list: any[];
    sysattr_list: any[];
    tags_list: any[];
    //seqnum: number;           // ?
    //usec_initialized: number; // ?
    devlink_priority: number;
    //refcount: number;         // This might not matter in the node environment. Control this on binding code.
    devnum: number;
    //ifindex: number;          // ?
    watch_handle: number;
    maj: number;
    min: number;
    parent_set: boolean;
    subsystem_set: boolean;
    devtype_set: boolean;
    devlinks_uptodate: boolean;
    envp_uptodate: boolean;
    tags_uptodate: boolean;
    driver_set: boolean;
    info_loaded: boolean;
    db_loaded: boolean;
    uevent_loaded: boolean;
    is_initialized: boolean;
    sysattr_list_read: boolean;
    db_persist: boolean;
}

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