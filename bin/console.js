#!/usr/bin/node

const readline = require('readline');
const axios = require('axios');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// {
//     "command": "Does the company have a list of supported browsers?",
//     "creator": {
//       "id": 12827066,
//       "attachable_sgid": "BAh7CEkiCGdpZAY6BkVUSSIpZ2lkOi8vYmMzL1BlcnNvbi8xMjgyNzA2Nj9leHBpcmVzX2luBjsAVEkiDHB1cnBvc2UGOwBUSSIPYXR0YWNoYWJsZQY7AFRJIg9leHBpcmVzX2F0BjsAVDA=--159e764d5847d6ee8bad4545fa7894fe62232fa5",
//       "name": "Mike Frank",
//       "email_address": "mfrank@consultwithcase.com",
//       "personable_type": "User",
//       "title": "Cloud Architect and Software Engineer",
//       "bio": "Playing with CATS",
//       "created_at": "2017-06-15T22:25:48.899-04:00",
//       "updated_at": "2020-06-18T17:36:35.979-04:00",
//       "admin": true,
//       "owner": true,
//       "client": false,
//       "time_zone": "America/New_York",
//       "avatar_url": "https://bc3-production-assets-cdn.basecamp-static.com/3097063/people/BAhpA7q5ww==--f3f20413c4068ebb50ab3679c28a4c5a608a93e1/avatar-64-x4?v=1",
//       "avatar_kind": "custom",
//       "company": {
//         "id": 8880,
//         "name": "Case Consulting"
//       }
//     },
//     "callback_url": "https://3.basecamp.com/3097063/integrations/LM4G6UhA6jcVfLJMj3J2Bmki/buckets/4675892/chats/646449024/lines"
//   }

let axiosOptions = {
    method: 'POST',
    url: 'http://localhost:3001/2015-03-31/functions/AskJeevesFunction/invocations',
    headers: {
        'Content-Type': 'application/json'
    }
};

var consolePrompt = function () {
    rl.question('Enter the command to send > ', (command) => {
        // TODO: Log the answer in a database
        console.log(`Sending command: "${command}" ...`);

        let axiosOptions = {
            method: 'POST',
            url: 'http://localhost:3001/2015-03-31/functions/AskJeevesFunction/invocations',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
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
            }
        };

        axios(axiosOptions).then(function (response) {
            console.log('Response:');
            console.log(response.data);
            consolePrompt();
        });

    });
};

consolePrompt();
