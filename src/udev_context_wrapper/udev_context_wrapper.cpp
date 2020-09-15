#include "udev_context_wrapper.h"

UdevContextWrapper::UdevContextWrapper(udev* context) : Object() {
    
    if(context != NULL){
        this->context = udev_ref(context); //Increases the ref count and returns the same object
    }else{
        this->context = udev_new();
    }
};

UdevContextWrapper::UdevContextWrapper() : Object() {
    this->context = udev_new();
};

UdevContextWrapper::~UdevContextWrapper(){
    if(this->context != NULL){
        this->context = udev_unref(this->context); //This returns NULL and removes our context;
    }
}

udev* UdevContextWrapper::GetContext(){
    return this->context;
}