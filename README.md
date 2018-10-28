# websitefromgithub
This utility is automaticly building website from your GitHub repository on your server. It is <a href="https://nodejs.org" target="_blank">Node.js</a> based script with easy to use set-up. All settings you are making are in settings.json file.

## Install
1. First make sure you have <a href="https://git-scm.com/" target="_blank">git</a> installed.
2. Add user wfg:
    ```
    adduser wfg
    ```
3. Add privileges to you website folder location. For example to folder /var/www/html
    ```
    sudo chown wfg -R /var/www/html
    ```
4. Make sure you have installed <a href="https://nodejs.org" target="_blank">Node.js</a> and <a href="http://pm2.keymetrics.io/" target="_blank">PM2</a>. If not - install them
    ```
    sudo npm install -g pm2
    ```
5. Change user to wfg and than cd to home directory
    ```
    su wfg
    ```
    ```
    cd $HOME
    ```
4. Clone this websitefromgithub repository
    ```
    git clone https://github.com/worepix/websitefromgithub.git
    ```
5. Go to websitefromgithub folder
    ```
    cd websitefromgithub
    ```
7. Edit settings.json file
    ```
    nano settings.json
    ```
    ```json
    {
        "GitHub": "",
        "web_location": "/var/www/html",
        "exported_folder": "public",
        "command": "hugo server -D",
        "frequency": "60"
    }
    ```
    **GitHub**: link to GitHub repository without .git in the end. Example:
    ```json
    "GitHub": "https://github.com/worepix/radimkozak.com"
    ```
    **web_location**: folder where final exported website will be deployed, default <a href="https://httpd.apache.org/" target="_blank">Apache</a> webserver is /var/www/html. Example:
    ```json
    "web_location": "/var/www/html"
    ```
    **exported_folder**: folder that makes your framework after build command with exported website. Default <a href="https://gohugo.io/" target="_blank">Hugo</a> folder is public. Example:
    ```json
    "exported_folder": "public"
    ```
    **command**: Command for building website. For Hugo I use `hugo -D`. Example:
    ```json
    "command": "hugo -D"
    ```
    **frequency**: In what frequency is websitefromgithub script checking if it's new version of source code on GitHub. The value is in minutes. Example:
    ```json
    "frequency": "60"
    ```
8. Now just start script via pm2
    ```
    pm2 start websitefromgithub.js
    ```
9. Save pm2 settings. After restart will websitefromgithub automatically start
    ```
    pm2 save
    ```