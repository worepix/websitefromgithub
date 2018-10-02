const md5File = require('md5-file');
var delay = require("delay");
var fs = require('fs');
var checkper = 1000;
const { execSync } = require('child_process');
var settingsfile = "C:\Users\0radi\Documents\websitefromgithub\settings.json";

getgithub();
counter();


function getgithub(){
    fs.readFile(settingsfile, (err, data) => {
        GitHub_url = JSON.parse(data.toString()).GitHub + ".git";
        GitHub_name = GitHub_url.split("/").toString()[2];
        console.log(GitHub_url + " " + GitHub_name);

    });
}

function counter() {
(async () => {
    await delay(checkper);
    check();
    counter();
})();
}

function check() {
    
}