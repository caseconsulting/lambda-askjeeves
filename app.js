'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const kendra = new AWS.Kendra({ apiVersion: '2019-02-03', logger: console });

/**
 * 
 * @param {*} query 
 */
function queryKendra(query) {
    console.log(`-- [queryKendra] Query: ${query}`)

    return kendra.query({ IndexId: '981f0af7-a189-4dc6-813e-3152f10c078f', QueryText: query }).promise();
}

/**
 * Method which handles the lambda event and context.
 * @param {*} event 
 * @param {*} context 
 */
exports.handler = async (event, context) => {
    console.log('-------------------- NEW INVOCATION --------------------');
    console.log("Event:");
    console.log(event);
    console.log("Context:");
    console.log(context);

    // NOTE: This silly hack is here primarily for when a developer uses the npm run local command.
    //       Why would a developer want to type in stringified JSON as a test event in test/event.json?
    let eventObj = (typeof(event.body) == 'string') ? JSON.parse(event.body) : event.body;

    let queryText = eventObj.command;
    return queryKendra(queryText).then(function (response) {
        console.log('Kendra response: ');
        console.log(JSON.stringify(response));

        return JSON.stringify(response, null, 4);
    },
    function (error) {
        console.log('Kendra error:');
        console.log(error);

        return error;
    });
};