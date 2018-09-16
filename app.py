#!/usr/bin/python3
# -*- utf-8 -*-
import requests
import click
import json
import os
import requests

@click.command()
@click.option("--run", is_flag=True, help="Clone your GitHub repository and make public website using Hugo")
@click.option("--repository", is_flag=True, help="Setup your GitHub repository")
@click.option("--install", is_flag=True, help="Install Hugo to you machine")


def cli(run, repository, install):
    
    settings_location = "/etc/websitefromgithub/"

    if run:
        githubrepository = str(json.loads(open(settings_location + "settings.json", "r+").read())["GitHub"]) + ".git"
        githubrepository_name = githubrepository.split("/")
    
        os.system("rm -rf /tmp/ " + str(githubrepository_name[4])[:-4])
        os.system("git clone " + githubrepository + " /tmp/" + str(githubrepository_name[4])[:-4] )
        os.system("cd /tmp/" + str(githubrepository_name[4])[:-4] + " && hugo -D")
        os.system("cp -rf /tmp/ " + str(githubrepository_name[4])[:-4] + "/public/" + " /var/www/")
        os.system("rm -rf /var/www/html/")
        os.system("mv /var/www/public /var/www/html")

       
    if repository:

        if not os.path.exists(settings_location):
            os.makedirs(settings_location)
            settings_file = open(settings_location + "settings.json", "w")
            settings_file.write(requests.get("https://raw.githubusercontent.com/worepix/websitefromgithub/master/settings.json").text)

        set_repository = raw_input("Paste your GitHub repository. For example: https://github.com/worepix/websitefromgithub\n")
        open(settings_location + "settings.json", "w").write('''{\n    "GitHub": "'''+ str(set_repository) + '''"\n}''')