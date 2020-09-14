
#define NAPI_VERSION 5

#pragma once

#include <napi.h>
#include <libudev.h>

using namespace Napi;

class UdevDeviceWrapper : public Napi::ObjectWrap<UdevDeviceWrapper>{

    public:

    UdevDeviceWrapper(const CallbackInfo& info);
    UdevDeviceWrapper(const CallbackInfo& info, udev_device* u_dev);
    Napi::Function GetClass(Napi::Env env);
    ~UdevDeviceWrapper();

    //UdevDeviceWrapper *parent_device;

    private:
    udev_device* internal_device;
};