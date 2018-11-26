WHAM is the Wearable Home Activity Monitor. The goal of the project is to create a low-cost, low-effort way for therapists to monitor pediatric patients in out patient therapy as they play VR games like the WII. This mobile app serves as the interface between the patient and the therapist. It connect to the WHAM bluetooth device to gather the data, allows the user to give feedback, and will display information to the patient and his or her parents. 

Some information about the development environment:

1. Because our development team is rather small, we wanted to have one code base that worked for both iOS and Android.

2. We wanted to avoid HTML based frameworks because they tend to be slow.

These steps led us to SCADE - a cross-platform library coded in Swift. It sounded wonderful, with tons of UI tools to make design faster. However, after installing and trying it out, we realized it was missing a lot of important features - namely on the network side of things. For example, the library did not have a built in way to support JSON Arrays or RESTful APIs that had URL substitution. For these reasons, we chose to rotate away from SCADE.

Then we went back to the drawing board, and it came down to two: Flutter and React Native. In the end we chose React Native because it's well used, not in beta, and coded in JavaScript which means code can be substituted with the API if need be.

Dependencies to Install:
1. Node.js
2. Watchman
3. Carthage (only maybe - I don't know if this is actually necessary)
4. iOS Only: You must be running MacOS and have the latest version of XCode installed.
5. Android Only: You must have Android Studio and ADB installed.

Installation Process:

1. Clone/Download Repository.
2. Run npm install.
3. Use "react-native run-ios" or "react-native run-android"

Questions:

1. I found that the WHAM device UUID might be "025A7775-49AA-42BD-BBDB-E2AE77782966", but what will it be in production?
