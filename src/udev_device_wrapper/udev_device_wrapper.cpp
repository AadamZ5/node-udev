#include "udev_device_wrapper.h"

UdevDeviceWrapper::UdevDeviceWrapper(const CallbackInfo& info, udev_device* u_dev) : ObjectWrap(info) {
    Napi::Env env = info.Env();

    //See if we got a native udev_device to construct from
    if(u_dev != NULL){
        this->internal_device = u_dev;
        udev_device_ref(this->internal_device); //Increase ref-count
    }else{
        //Determine if we were given syspath, or device node, or what.
        //The typescript definitions require that the constructor is called with an object as follows:
        /*
        */
    }
};

UdevDeviceWrapper::UdevDeviceWrapper(const CallbackInfo& info) : ObjectWrap(info) {
    Napi::Env env = info.Env();

    //No native udev_device is given. We must determine the type of identifier given somehow.
    //The typescript definitions require that the constructor is called with an object as follows:
    /*
    */

};

UdevDeviceWrapper::~UdevDeviceWrapper(){

    //We have to make sure we unref the device during cleanup
    if(this->internal_device != NULL){
        udev_device_unref(this->internal_device);
    }
};

String UdevDeviceWrapper::GetSysName(const CallbackInfo& info){
    Napi::Env env = info.Env();
    return String::New(env, udev_device_get_sysname(this->internal_device));
}

Napi::Function UdevDeviceWrapper::GetClass(Napi::Env env) {

    //Define the class
    return DefineClass(env, "UdevDevice", 
    {
        //InstanceMethod("GetSysName", &UdevDeviceWrapper::GetSysName)
    });
}

