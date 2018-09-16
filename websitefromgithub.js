var checksum = require('checksum'), cs = checksum('dshaw');
var delay = require("delay");
var checkper = 1000;
var fs = require('fs');
var GitHub_url;
var Github_name;
var localgit = "/etc/websitefromgithub/" + Github_name + "/.git/logs/HEAD";
var GitHubgit = "/etc/websitefromurl/localgitchecksum/";
var settingsfile= "/etc/websitefromgithub/settings.json";
var local_checksumgit;
var GitHub_checksumgit;
var fs = require('fs');
var localgitchecksum_folder = "/etc/websitefromurl/localgitchecksum/";

getgithub();
counter();


function getgithub(){
    fs.readFile(settingsfile, (err, data) => {
        GitHub_url = JSON.parse(data.toString()).GitHub + ".git";
        GitHub_name = GitHub_url.split("/").substring(0, -4);

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
     });
     if (fs.existsSync(localgitchecksum_folder)) {
         exec("rm -rf " + localgitchecksum_folder);
         exec("git clone --no-checkout " + GitHub_url + " " + localgitchecksum_folder);
     }

     else {
        exec("git clone --no-checkout " + GitHub_url + " " + localgitchecksum_folder);
     }
    
     checksum.file(GitHubgit, function (err, sum) {
        GitHub_checksumgit = cs;
     });

     if (GitHub_checksumgit == local_checksumgit) {
         null;
     }

     else if (GitHub_checksumgit != local_checksumgit) {
         exec("websitefromgithub --run");
     }

}