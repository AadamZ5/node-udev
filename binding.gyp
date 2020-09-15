{
    "targets": [
        {
            "target_name": "udev",
            "sources": [
                #"src/udev_wrapper.h",
                #"src/udev_wrapper.cpp",
                "src/udev_device_wrapper/udev_device_wrapper.h",
                "src/udev_device_wrapper/udev_device_wrapper.cpp",
            ],
            "libraries": [
                "-ludev",
            ],
            "include_dirs": [
                "<!@(node -p \"require('node-addon-api').include\")",
            ],
            "dependencies": [
                "<!(node -p \"require('node-addon-api').gyp\")",
            ],
            "cflags!": ["-fno-exceptions"],
            "cflags_cc!": ["-fno-exceptions"],
            "defines": ["NAPI_CPP_EXCEPTIONS", "NAPI_VERSION=5"]
        },

        {
            "target_name": "action_after_build",
            "type": "none",
            "dependencies": [ "<(module_name)" ],
            "copies": [
                {
                    "files": [ "<(PRODUCT_DIR)/<(module_name).node" ],
                    "destination": "<(module_path)"
                }
            ]
        }

    ]
}
