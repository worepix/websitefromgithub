const md5File = require('md5-file');
var delay = require("delay");
var fs = require('fs');
const { execSync } = require('child_process');

var checkper = 1000;                // Checking changes frequency in milliseconds
var settingsfile = "settings.json"; // File where settings is located

var settings_GitHub_url;
var settings_GitHub_name;
var settings_web_location;
var settings_command;

getvariables();
counter();

// Getting variables from settings.json
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
        }
    });
}

// Frequency counter
function counter() {
(async () => {
    await delay(checkper);
    check();
    counter();
});
}

// Check for changes
function check() {
    
}