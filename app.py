#!/usr/bin/python3
# -*- utf-8 -*-
import requests
import click
from pathlib import Path
import json
import os
import requests

@click.command()
@click.option("--run", is_flag=True, help="Clone your GitHub repository and make public website using Hugo")
@click.option("--repository", is_flag=True, help="Setup your GitHub repository")
@click.option("--install", is_flag=True, help="Install Hugo to you machine")


def cli(run, repository, install):
    
    settings_location = "/etc/websitefromgithub/"
    
    osname = os.name
    
    githubrepository = str(json.loads(open(settings_location + "settings.json", "r+").read())["GitHub"]) + ".git"
    
    if run:
        githubrepository_name = githubrepository.split("/")
        os.system("git clone " + githubrepository)
        os.system("cd " + str(githubrepository_name[4])[:-4])
        os.system("hugo")
        os.system("mv public/ /var/www/html/")
        os.system("mv /var/www/html/public/ /var/www/html/html/")
       
    if repository:

        if not os.path.exists(settings_location):
            os.makedirs(settings_location)
            os.system("cd " + settings_location)
            settings_file = open("settings.json")
            settings_file.write(requests.get("https://raw.githubusercontent.com/worepix/websitefromgithub/settings.json").text)

        set_repository = input("Paste your GitHub repository. For example: https://github.com/worepix/websitefromgithub\n")
        open(settings_location + "settings.json", "w").write('''{\n    "GitHub": "'''+ set_repository + '''"\n}''')

    if install:
        if osname == "Linux":
            linux_distro = input("Choose your Linux distro: Ubuntu, ArchLinux, Fedora, RedHat and CentOS. Type distro like you see here.\n").lower()
            if linux_distro == "ubuntu":
                os.system("sudo apt-get install hugo")
                
                git_installed_ubuntu = input("Do you have git installed? yes or no. Type yes if you don't know\n")
                if git_installed_ubuntu == "yes" or git_installed_ubuntu == "y":
                    None
                else:
                    os.system("sudo apt-get install git")
            
            elif linux_distro == "archlinux":
                os.system("sudo pacman -Syu hugo")
                
                git_installed_arch = input("Do you have git installed? yes or no. Type yes if you don't know\n")
                if git_installed_arch == "yes" or git_installed_arch == "y":
                    None
                else:
                    os.system("sudo pacman -S git")
            
            elif linux_distro == "fedora" or linux_distro == "RedHat" or linux_distro == "centos":
                os.system("sudo dnf install hugo")
                
                git_installed_fedora = input("Do you have git installed? yes or no. Type yes if you don't know\n")
                if git_installed_fedora == "yes" or git_installed_fedora == "y":
                    None
                else:
                    os.system("sudo dnf install git")
                

        else:
            print("Your system is on supported yet. Soon!")
