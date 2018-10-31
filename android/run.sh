#!/bin/bash

./gradlew ${1:-installDevMinSdkDevKernelDebug} --stacktrace && adb shell am start -n wham.northeastern.edu/host.exp.exponent.MainActivity
