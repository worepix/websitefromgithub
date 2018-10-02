const md5File = require('md5-file');
var delay = require("delay");
var fs = require('fs');
const { execSync } = require('child_process');
var settingsfile = "settings.json"; // File where settings is located

var settings_GitHub_url;
var settings_GitHub_name;
var settings_web_location;
var settings_command;
var settings_frequency;

getvariables();

// Check for changes
function check() {
    console.log(settings_command);
}


// Frequency counter
function counter() {
(async () => {
    check();
    await delay(settings_frequency);
    counter();
})();
}
    
// Getting variables from settings.json and run function counter
function getvariables(){

    fs.readFile(settingsfile, (err, data) => {

        if (err) {
            throw err;
        }

        else {
        settings_GitHub_url = (JSON.parse(data.toString()).GitHub + ".git").toString();
        settings_GitHub_name = settings_GitHub_url.split("/")[4].substring(0, ((settings_GitHub_url.split("/")[4]).toString()).length-4);
        settings_web_location = JSON.parse(data.toString()).web_location;
        settings_command = JSON.parse(data.toString()).command;
        settings_frequency = parseInt((JSON.parse(data.toString()).frequency).toString());
        counter();
        }
    });
}