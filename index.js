const Bot = require('./bot.js');
const fs = require('fs');

const config = require('./config.json');

fs.writeFileSync('output/invalid.txt', '');
fs.writeFileSync('output/verified.txt', '');
fs.writeFileSync('output/unverified.txt', '');

const tokens = fs.readFileSync('tokens.txt', 'utf-8').replace(/\r/gi, '').split("\n");

var i = 0;
setInterval(() => {
    if (i >= tokens.length) {
        console.log("Done Checking Tokens!");
        process.exit(1);
    }
    Bot.check(tokens[i]);
    i++;
}, config.timeout);