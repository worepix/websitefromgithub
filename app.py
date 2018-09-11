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
    
    osname = os.name
    
    if run:
        githubrepository = str(json.loads(open(settings_location + "settings.json", "r+").read())["GitHub"]) + ".git"
        githubrepository_name = githubrepository.split("/")
        
        os.system("rm -rf " + settings_location + str(githubrepository_name[4])[:-4])
        os.system("git clone " + githubrepository + " /etc/websitefromgithub/" +  str(githubrepository_name[4])[:-4] + "/")
        os.system("cd /etc/websitefromgithub/" + str(githubrepository_name[4])[:-4] + " && hugo")
        os.system("mv /etc/websitefromgithub/" + str(githubrepository_name[4])[:-4] + "/public/" + " /var/www/")
        os.system("cp -rf " + settings_location + str(githubrepository_name[4])[:-4] + "/public/ /var/www/")
       
    if repository:

        if not os.path.exists(settings_location):
            os.makedirs(settings_location)
            settings_file = open(settings_location + "settings.json", "w")
            settings_file.write(requests.get("https://raw.githubusercontent.com/worepix/websitefromgithub/master/settings.json").text)

        set_repository = raw_input("Paste your GitHub repository. For example: https://github.com/worepix/websitefromgithub\n")
        open(settings_location + "settings.json", "w").write('''{\n    "GitHub": "'''+ str(set_repository) + '''"\n}''')

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
