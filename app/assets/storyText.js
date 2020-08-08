/*
Indicators
@ DECISION {number} - displays {number} number of button deicisions
@ CONTINUE - continues with the story based on next line node
*/

let storyMap = new Map();

storyMap["d1"] = [
  "Felix... Felix! Wake up!",
  "We have to go NOW!",
  "You wake up slowly in a daze.",
  "DECISION 2",
  "HEY. who's there?",
  "Where am I?"
];

storyMap["s1"] = ["Don't worry about who I am.", "CONTINUE", "d2"];

storyMap["s2"] = ["We in the middle of the forest.", "CONTINUE", "d2"];

storyMap["d2"] = [
  "You reach a hill and see a bridge in the distance.",
  "Common lets move, let's rest here.",
  "DECISION 2",
  "Insist on going to bidge",
  "Agree to rest"
];

export default storyMap;
