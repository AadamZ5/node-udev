const udev_addon = require('../../build/Release/udev');
const udev_device = udev_addon.UdevDevice;

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

/**Options for creating a Udev device. At least one of these options must be present. */
export interface UdevDeviceOptions{
    /**
     * A syspath is any subdirectory of /sys, with the restriction that a subdirectory of /sys/devices (or a symlink to one) represents a real device and as such must contain a uevent file.
     * @see https://manpages.debian.org/testing/libudev-dev/udev_device_new_from_syspath.3.en.html
     */
    syspath?: string;

    /**
     * a device type, which can be b for block devices or c for character devices, as well as a devnum (maj:min or just maj)
     */
    devnum?: {
        type: 'b' | 'c'
        num: {
            maj: string;
            min?: string
        }
    } | string;

    /**
     * Example:
     * 
     * +sound:card29
     * 
     * {
     *  subsystem: "+soundcard",
     *  name: "card29"
     * }
     */
    subsystem_name?: {
        subsystem: string;
        name: string;
    } | string;
    /**
     * Example      ||  Explanation
     *
     * b8:2             Block-device maj:min
     * c128:1           Char-device maj:min
     * n3               Network-device ifindex
     */
    device_id: string;
}

export class UdevDevice{

    
    constructor(udev_dev_options: UdevDeviceOptions){
        
    }

}

