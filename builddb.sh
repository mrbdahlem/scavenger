#!/bin/bash

if ! pgrep -x "mariadb" > /dev/null
then
    sudo /etc/init.d/mariadb start
fi

sudo mariadb -Bse "CREATE DATABASE $DATABASE_NAME; GRANT ALL PRIVILEGES ON $DATABASE_NAME.* to '$DATABASE_USER'@'localhost' IDENTIFIED BY '$DATABASE_PW';"

