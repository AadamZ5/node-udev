#pragma once

#include <napi.h>
#include <libudev.h>

using namespace Napi;

class UdevDeviceWrapper : public Napi::ObjectWrap<UdevDeviceWrapper>{

    public:

    UdevDeviceWrapper(const CallbackInfo& info);
    UdevDeviceWrapper(const CallbackInfo& info, udev_device* u_dev);
    static Napi::Function GetClass(Napi::Env env);
    ~UdevDeviceWrapper();

    UdevDeviceWrapper GetParentDevice(const CallbackInfo& info);
    String GetSysPath(const CallbackInfo& info);
    String GetDevPath(const CallbackInfo& info);
    String GetSysName(const CallbackInfo& info);
    String GetSysNum(const CallbackInfo& info);
    String GetDevNode(const CallbackInfo& info);
    String GetDevNodeMode(const CallbackInfo& info);
    String GetSubSystem(const CallbackInfo& info);
    String GetDevType(const CallbackInfo& info);
    String GetDriver(const CallbackInfo& info);
    String GetAction(const CallbackInfo& info);

    private:
    udev_device* internal_device;
};