#!/usr/bin/env bash

echo "Deploying process"
echo "--------------------------"

branch=$(git branch | sed -n -e 's/^\* \(.*\)/\1/p')
echo "---Git Pulling $branch---"
git stash
git checkout $branch
git pull --rebase
 
echo "--- pm2 delete next-app ---"

pm2 delete next-app

nvm use 18.17

pnpm install

npx next build

echo "--- pm2 start ---"

pm2 start npm --name "next-app" -- run start

echo "--------------------------"

echo "Started ..."

pm2 save

echo "saved ..."

sleep 2

echo "-----------Free memory----------"

free -mh

echo "-----------Free memory----------"
