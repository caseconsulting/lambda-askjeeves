#!/usr/bin/node
'use strict';

const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function consolePrompt () {
    rl.question('Enter the command to send > ', (command) => {
        // TODO: Log the answer in a database
        console.log(`Sending command: "${command}" ...`);

        let axiosOptions = {
            method: 'POST',
            // url: 'https://mi6i1noyah.execute-api.us-east-1.amazonaws.com/Prod/',
            url: 'http://localhost:3001/2015-03-31/functions/AskJeevesFunction/invocations',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                body: JSON.stringify({
                    command: command,
                    creator: {
                        id: 999999999,
                        attachable_sgid: "Somerandomreallylongstringoftext",
                        name: "Case User",
                        email_address: "gud-employee@consultwithcase.com",
                        personable_type: "User",
                        title: "Software Engineer",
                        bio: "This is my bio",
                        created_at: "2017-06-15T22:25:48.899-04:00",
                        updated_at: "2020-06-18T17:36:35.979-04:00",
                        admin: true,
                        owner: true,
                        client: false,
                        time_zone: "America/New_York",
                        avatar_url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
                        avatar_kind: "custom",
                        company: {
                            "id": 8880,
                            "name": "Case Consulting"
                        }
                    }
                })
            }
        };

        axios(axiosOptions).then(function (response) {
            console.log('Response:');
            console.log(response.data);

            consolePrompt();
        });

    });
};

console.log('This script simulates a private-message chat with the chatbot implemented in app.js');
console.log('On Basecamp, if you are not in a private message with the chatbot, you would need to prefix');
console.log('any command with !jeeves\n')

console.log('Press Ctrl+C to exit.\n');

consolePrompt();
