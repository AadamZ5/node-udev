#include "udev_device_wrapper.h"

UdevDeviceWrapper::UdevDeviceWrapper(const CallbackInfo& info, udev_device* u_dev) : ObjectWrap(info) {
    Napi::Env env = info.Env();

    //See if we got a native udev_device to construct from
    if(u_dev != NULL){
        this->internal_device = u_dev;
        udev_device_ref(this->internal_device); //Increase ref-count
    }else{
        //Determine if we were given syspath, or device node, or what.
        //TODO That ↑
    }
};

UdevDeviceWrapper::UdevDeviceWrapper(const CallbackInfo& info) : ObjectWrap(info) {
    Napi::Env env = info.Env();

    //No native udev_device is given. We must determine the type of identifier given somehow.
    //TODO That ↑

};

UdevDeviceWrapper::~UdevDeviceWrapper(){

    if(this->internal_device != NULL){
        udev_device_unref(this->internal_device);
    }
};

Napi::Function UdevDeviceWrapper::GetClass(Napi::Env env) {

    //Define the class
    return DefineClass(env, "UdevDevice", {

    });
}