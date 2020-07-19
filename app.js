'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: 'us-east-1' });

exports.handler = async (event, context) => {
    console.log('-------------------- NEW INVOCATION --------------------');
    console.log("Event:");
    console.log(event);
    console.log("Context:");
    console.log(context);

    return "Hello!";
};