var checksum = require('checksum')
var delay = require("delay");
var checkper = 1000;
var fs = require('fs');
var GitHub_url;
var GitHub_name;
var localgit;
var GitHubgit = "/etc/websitefromurl/localgitchecksum/";
var settingsfile= "/etc/websitefromgithub/settings.json";
var local_checksumgit;
var GitHub_checksumgit;
var fs = require('fs');
var localgitchecksum_folder = "/etc/websitefromgithub/localgitchecksum/";
const { execSync } = require('child_process');

getgithub();
counter();


function getgithub(){
    fs.readFile(settingsfile, (err, data) => {
        GitHub_url = JSON.parse(data.toString()).GitHub + ".git";
        GitHub_name = GitHub_url.split("/");
        localgit = "/etc/websitefromgithub/" + (GitHub_name[4].toString()).substring(0, ((GitHub_name[4].toString()).length)-4) + "/.git/logs/HEAD"

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
    console.log((GitHub_name[4].toString()).substring(0, ((GitHub_name[4].toString()).length)-4))
    checksum.file(localgit, function (err, sum) {
        cs = checksum('dshaw');
        local_checksumgit = cs;
     });
     if (fs.existsSync(localgitchecksum_folder)) {
        execSync("rm -rf " + localgitchecksum_folder);
        execSync("git clone --no-checkout " + GitHub_url + " " + localgitchecksum_folder);
     }

     else {
        execSync("git clone --no-checkout " + GitHub_url + " " + localgitchecksum_folder);
     }
    
     checksum.file(GitHubgit, function (err, sum) {
        cs = checksum('dshaw');
        GitHub_checksumgit = cs;
     });

     if (GitHub_checksumgit == local_checksumgit) {
         null;
     }

     else if (GitHub_checksumgit != local_checksumgit) {
        execSync("websitefromgithub --run");
     }

     console.log(GitHub_checksumgit);
     console.log(local_checksumgit);

}