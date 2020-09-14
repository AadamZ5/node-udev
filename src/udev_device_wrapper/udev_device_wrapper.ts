const udev_dev = require('../../build/Release/');

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

