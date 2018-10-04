const md5File = require('md5-file');
var delay = require("delay");
var fs = require('fs');
const { execSync } = require('child_process');
var settingsfile = "settings.json"; // File where settings is located
var rimraf = require('rimraf');

var settings_GitHub_url;
var settings_GitHub_name;
var settings_web_location;
var settings_command;
var settings_frequency;
var settings_exported_folder;

getvariables();

// Check for changes
function check() {
    console.log("start check");
    if (fs.existsSync("git/" + settings_GitHub_name + "/")) {
        console.log("removed and cloned");
        rimraf.sync("git/");
        execSync("git clone --no-checkout " + settings_GitHub_url + " git/" + settings_GitHub_name + "/");
    }

    else {
        console.log("cloned");
        execSync("git clone --no-checkout " + settings_GitHub_url + " git/" + settings_GitHub_name + "/");
    }

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
        settings_exported_folder = JSON.parse(data.toString()).exported_folder;
        console.log(settings_exported_folder);
        counter();
        }
    });
}