const request = require('request');
const fs = require('fs');
const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

const args = process.argv.slice(2);
const url = args[0];
const filePath = args[1];

request(url, (error, response, body) => {
  if (error) {
    console.log('Cannot get response from server. Error:', error); 
    process.exit();
  }
  
  console.log('statusCode:', response && response.statusCode); 
  
  if (fs.existsSync(filePath)) {
      rl.question('File exists, do you want to overwrite ', (answer) => {
        if (answer === "y") {
          writeToFileAndExit(filePath, body);
        }
        rl.close();
      });
  } else {
    writeToFileAndExit(filePath, body);
  }
});

const writeToFileAndExit = function(filePath, body) {
  fs.writeFile(filePath, body, err => {
    if (err) {
      console.log("File path is not valid")
      console.error(err)
      process.exit();
    }
    console.log(`Downloaded and saved ${body.length} bytes to ${filePath}`);
    process.exit();
  });
}



  


