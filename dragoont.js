#!/usr/bin/env node
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Define the version (match with package.json)
const VERSION = "0.0.2";

const args = process.argv.slice(2);

// Handle version command
if (args.includes("--version")) {
  console.log(`DarkCelestialDragoonT (DCDT) version ${VERSION}`);
  process.exit(0);
}

// Get the file to run from the arguments
const fileToRun = args[0];

if (!fileToRun) {
  console.error("Usage: dragoont <file.dcdt>");
  process.exit(1);
}

const filePath = path.resolve(fileToRun);

// Check if the file exists
if (!fs.existsSync(filePath)) {
  console.error(`Error: File "${filePath}" not found.`);
  process.exit(1);
}

// Function to print the message
function printdt(message) {
  console.log(message);
}

// Read and parse the DCDT file (e.g., test.dcdt)
const dcdtCode = fs.readFileSync(filePath, "utf8");

// Process the DCDT code line by line
const lines = dcdtCode.split("\n");
lines.forEach(line => {
  // Check if the line contains the printdt command
  if (line.startsWith("printdt")) {
    const message = line.match(/printdt\("(.*)"\)/);
    if (message) {
      printdt(message[1]);  // Call the printdt function
    }
  }
});

// The code now works by printing any printdt statements in the DCDT file

// Optionally, execute the interpreter command (if needed for other operations)
// const command = `node interpreter.js "${filePath}"`;
// exec(command, (error, stdout, stderr) => {
//   if (error) {
//     console.error(`Error: ${error.message}`);
//     process.exit(1);
//   }
//   if (stderr) {
//     console.error(`STDERR: ${stderr}`);
//   }
//   console.log(stdout);
// });
