{
    "targets": [
        {
            "target_name": "udev",
            "sources": [
                "src/udev.h",
                "src/udev.cpp"
            ],
            "libraries": [
                "-ludev",
            ],
            "include_dirs" : [
                "src/"
            ]
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
