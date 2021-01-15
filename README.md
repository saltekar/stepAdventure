<h1>Step Adventure App</h1>
<p>
Step Adventure is a mobile app that allows users to play a text adventure
game while encouraging overall health. In order to progress the story, users
have to accumulate steps from walking or running. A user is presented with  
multiple decisions to choose from at countless points in the story with each 
decision costing a certain number of tokens. These tokens are obtained from
the amount of steps the user walks.

This app is built in React Native using JavaScript. In-device pedometer 
data is used to keep track of a user’s daily step count, and 
Async Storage is utilized to store game progress data locally.

The story is represented by a directed graph which consists of nodes that 
contain pieces of story content and decisions. This graph is generated by 
a story engine that was built to convert a JSON file containing story 
nodes, into a organized mapping of each possible path a user can follow.
</p>

<h2>Instructions To Run App</h2>
<p>
We will be running the app using Expo CLI.

Make sure Expo is installed. It can be installed with the command
below.

```
npm install --global expo-cli
```

<h3>Running On a Physical Device</h3>
Download the Expo client app on your IOS or Android device.


Now simply run the command below from the root directory.

```
npm start
```
Scan the QR code shown in the new tab opened or in the terminal itself.

This will automatically open the Expo app and display Step Adventure.

<h3>Running On an IOS Simulator (macOS Only)</h3>
Make sure Xcode is installed on your device.


Go the preferences on Xcode menu and double check the most recent version of the
Command Lines Tools is chosen from the dropdown.

Open up an IOS Simulator of the model you want.

Run app from root directory using command below.

```
npm start
```
Press ```i``` from the command line to run on your IOS simulator.

This will automatically open the Expo app and display Step Adventure.
If Expo app not on simulator it will first be downloaded.
</p>
