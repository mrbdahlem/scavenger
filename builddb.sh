#!/bin/bash

if ! pgrep -x "mariadb" > /dev/null
then
    sudo /etc/init.d/mariadb start
fi

sudo mariadb -Bse "CREATE DATABASE $MARIADB_DATABASE; GRANT ALL PRIVILEGES ON $MARIADB_DATABASE.* to '$MARIADB_USER'@'localhost' IDENTIFIED BY '$MARIADB_PASSWORD';"

