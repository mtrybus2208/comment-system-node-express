#!/usr/bin/env bash
# Packages
NODE="nodejs"
BUILD_ESSENTIAL="build-essential"
MONGO="mongodb-org"
GIT="git"
# Prerequisites
GIT_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $GIT | grep "install ok installed")
echo "Checking for $GIT: $GIT_INSTALLED"
if [ "" == "$GIT_INSTALLED" ]; then
 apt-get update
 apt-get install -y $GIT
fi
# MongoDB
MONGO_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $MONGO | grep "install ok installed")
echo "Checking for $MONGO: $MONGO_INSTALLED"
if [ "" == "$MONGO_INSTALLED" ]; then
sudo apt-key list | \
 grep "expired: " | \
 sed -ne 's|pub .*/\([^ ]*\) .*|\1|gp' | \
 xargs -n1 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys
 sudo apt-key adv — keyserver hkp://keyserver.ubuntu.com:80 — recv 7F0CEB10
 echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
 sudo apt-get update
sudo apt-get install mongodb-org
fi
# Node.js
NODE_INSTALLED=$(dpkg-query -W --showformat='${Status}\n' $NODE | grep "install ok installed")
echo "Checking for $NODE: $NODE_INSTALLED"
if [ "" == "$NODE_INSTALLED" ]; then
 sudo curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
 sudo apt-get install -y build-essential nodejs
fi

# https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/
