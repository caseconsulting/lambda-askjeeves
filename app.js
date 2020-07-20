'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });
const kendra = new AWS.Kendra({ apiVersion: '2019-02-03', logger: console });

/**
 * Send any text query to AWS Kendra
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
        console.log(JSON.stringify(response, null, 4));

        // Edit this! Format it nicely for a chat bot response.
        // Basecamp will process HTML formatting for headings and things of that nature, so you can include those in your responses.
        // You will eventually want to remove the following JSON.stringify(response, null, 4) altogether and replace it with a string
        // wih HTML formatting.
        for (let result in response.ResultItems) {
          console.log(result + '++++++');
          if (response.ResultItems[result].Type == 'ANSWER') {
            return response.ResultItems[result].AdditionalAttributes[0].Value.TextWithHighlightsValue.Text;
          }
        }
        return 'No answer only documents and i hate documents'
        //return response.ResultItems[0].DocumentExcerpt.Text;
    },
    function (error) {
        console.log('Kendra error:');
        console.log(error);

        return error;
    });
};
