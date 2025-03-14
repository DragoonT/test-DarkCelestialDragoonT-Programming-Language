const { exec } = require("child_process");

// Get the DCDT file path from the arguments
const fileToRun = process.argv[2];

if (!fileToRun) {
  console.error("No file specified.");
  process.exit(1);
}

// Replace "dcdt_interpreter" with your actual DCDT executable
const command = `dcdt_interpreter "${fileToRun}"`; 

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`STDERR: ${stderr}`);
    return;
  }
  console.log(stdout);
});
