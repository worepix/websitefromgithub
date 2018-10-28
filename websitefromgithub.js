var delay = require("delay");
var fs = require('fs');
var fs_extra = require("fs-extra");
const { execSync } = require('child_process');
var settingsfile = "settings.json"; // File where settings is located
var rimraf = require('rimraf');

var settings_GitHub_url;
var settings_GitHub_name;
var settings_web_location;
var settings_command;
var settings_frequency;
var settings_exported_folder;
var checksum_website;
var checksum_git;

getvariables();

// Build and move exported folder to web location
function move() {
    console.log("start building and moving...");
    execSync("cd " + settings_GitHub_name + "/ && " + settings_command);
    if (fs.existsSync(settings_GitHub_name + "/" + settings_exported_folder + "/")) {
        rimraf.sync(settings_web_location);
        fs_extra.copy(settings_GitHub_name + "/" + settings_exported_folder, settings_web_location, function(err) {
            if (err) throw err;
            else {
                console.log("successfully moved");
            }
        });
    };

    if (fs.existsSync(settings_GitHub_name + "/" + settings_exported_folder + "/"), function(err) {
        if (err) {
        console.log("error while building");
        console.log(settings_GitHub_name + "/" + settings_exported_folder);
        }
    });
}

// Check for changes
function check() {
    console.log("start check");
    if (fs.existsSync("git/" + settings_GitHub_name + "/")) { // Check if exist git folder
        console.log("removing and cloning");
        rimraf.sync("git/");
        execSync("git clone --no-checkout " + settings_GitHub_url + " git/" + settings_GitHub_name + "/");
        console.log("removed and cloned");
    }

    else { // If git folder do not exist, clone it
        console.log("cloning...");
        execSync("git clone --no-checkout " + settings_GitHub_url + " git/" + settings_GitHub_name + "/");
        console.log("cloned");
    }

    if (fs.existsSync(settings_GitHub_name + "/")) { // Check if exist website folder
        fs.readFile("git/" + settings_GitHub_name + "/.git/refs/heads/master", function (err, data) {
            if (err) throw err;
            checksum_git = data.toString();
            fs.readFile(settings_GitHub_name + "/.git/refs/heads/master", function (err, data) {
                if (err) throw err;
                checksum_website = data.toString(); 
                if (checksum_website == checksum_git) { // If checksum of git and website folders are equal, website is up to date
                    console.log("not updated");
                }

                else if (checksum_website != checksum_git) { // If not, clone new website repository
                    console.log("updating...");
                    rimraf.sync(settings_GitHub_name + "/");
                    execSync("git clone " + settings_GitHub_url);
                    move();
                }
            });
        });
    }

    else { // If website folder do not exist, clone it and run chceck again
        console.log("cloning website...");
        execSync("git clone " + settings_GitHub_url);
        move();
        console.log("cloned website");
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
        settings_frequency = parseInt((JSON.parse(data.toString()).frequency).toString())/1000/60;
        settings_exported_folder = JSON.parse(data.toString()).exported_folder;
        counter();
        }
    });
}