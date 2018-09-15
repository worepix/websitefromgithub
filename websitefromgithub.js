var checksum = require('checksum'), cs = checksum('dshaw');
var delay = require("delay");
var checkper = 1000;
var fs = require('fs');
var GitHub_url;
var Github_name;
var localgit = "/etc/" + Github_name + "/.git/logs/HEAD";
var settingsfile= "/etc/webfromgithub/settings.json";
var local_checksumgit;

getgithub();
counter();


function getgithub(){
    fs.readFile(settingsfile, (err, data) => {
        GitHub_url = JSON.parse(data.toString()).GitHub;
        GitHub_name = GitHub_url.split("/");

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
    console.log(GitHub_url);
    console.log(GitHub_name[4])
    checksum.file(localgit, function (err, sum) {
        local_checksumgit = cs;
     })
}