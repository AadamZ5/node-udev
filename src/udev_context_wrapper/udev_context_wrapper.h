#pragma once

#include <napi.h>
#include <libudev.h>
#include "../udev_device_wrapper/udev_device_wrapper.h"

using namespace Napi;

class UdevContextWrapper : Object {

    public:
    UdevContextWrapper(udev* context);
    UdevContextWrapper();
    static Napi::Function GetClass(Napi::Env env);
    ~UdevContextWrapper();

    udev* GetContext();
    UdevDeviceWrapper from_syspath()
    

    private:
    udev *context;

};
