const request = require('request');
const chalk = require('chalk');
const fs = require('fs');

var invalid = [];
var verified = [];
var unverified = [];

class Checker {
    constructor(token) {
        this.token = token;
    }
    check() {
        request({
            method: "GET",
            url: "https://discordapp.com/api/v7/users/@me",
            headers: {
                authorization: this.token
            }
        }, (error, response, body) => {
            if (!body) return;
            var json = JSON.parse(body);
            if (!json.id) {
                invalid.push(this.token);
                fs.appendFile('output/invalid.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else if (!json.verified) {
                unverified.push(this.token);
                fs.appendFile('output/unverified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            } else {
                verified.push(this.token);
                fs.appendFile('output/verified.txt', this.token + "\n", (err) => {
                    if (err) throw err;
                });
            }
            console.clear();
            var text = "";
            text += chalk.green(`Verified: ${verified.length}`);
            text += chalk.blue(" | ");
            text += chalk.yellow(`Unverified: ${unverified.length}`);
            text += chalk.blue(" | ");
            text += chalk.red(`Invalid: ${invalid.length}`);
            var title = `Verified: ${verified.length} | Unverified: ${unverified.length} | Invalid: ${invalid.length}`;
            log(text, title);
        });
    }
}

function log(text, title) {
    if (process.platform == 'win32') {
        process.title = title;
    } else {
        process.stdout.write('\x1b]2;' + title + '\x1b\x5c');
    }
    console.log(text);
}

const Bot = {
    check: function(token) {
        new Checker(token).check();
    }
};

module.exports = Bot;
