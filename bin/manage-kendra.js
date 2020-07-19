#!/usr/bin/node
'use strict';

// -- Imports
const AWS = require('aws-sdk');

// -- Helper functions
function showHelpPrompt () {
    console.log('Usage: ./bin/manage-kendra.js <start|stop|info>');
    process.exit();
}

// -- Script procedures
let firstArgument = process.argv[2];

if (!['start', 'stop', 'info'].find((i) => { return i == firstArgument; })) showHelpPrompt();

AWS.config.update({ region: 'us-east-1' });
const kendra = new AWS.Kendra({ apiVersion: '2019-02-03' /*, logger: console */ });

kendra.listIndices({}, function (error, data) {
    let caseBenefitsIndex = data && data.IndexConfigurationSummaryItems && data.IndexConfigurationSummaryItems.find((item) => {
        return item.Name == 'case-benefits-index';
    });

    if (!caseBenefitsIndex && firstArgument == 'start') {
        console.log(`Starting index: case-benefits-index`);
        
        kendra.createIndex({
            Name: 'case-benefits-index',
            RoleArn: 'arn:aws:iam::453274522834:role/service-role/AmazonKendra-us-east-1-case-benefits-index-role',
            Edition: 'DEVELOPER_EDITION',
        }, function (error, data) {
            if (!error) { 
                console.log('Index created successfully!'); 

                kendra.createDataSource({
                    IndexId: data.Id,
                    Name: 'case-consulting-benefits-index-data-source',
                    RoleArn: 'arn:aws:iam::453274522834:role/service-role/AmazonKendra-case-benefits-bucket-role',
                    Type: 'S3',
                    S3Configuration: {
                        BucketName: 'case-consulting-benefits-bucket'
                    }
                }); 
                // function (error, data) {
                //     if (!error) {
                //         console.log('Index Data Source created successfully!');
                //         process.exit(0);
                //     }
                //     else {
                //         console.log('Index Data Source creation encountered an error:');
                //         console.log(error);
                //         process.exit(-1);
                //     }
                // });
            }
            else {
                console.log('An error occured...');
                console.log(error);
            } 
        });
    }
    else {
        console.log(`Index Name: ${caseBenefitsIndex.Name}`);
        console.log(`Index ID: ${caseBenefitsIndex.Id}`)
        if (firstArgument == 'info') {
            kendra.describeIndex({ Id: caseBenefitsIndex.Id }, function (error, data) {
                console.log(data);
            });
            process.exit(0);
        }
        if (firstArgument == 'stop') {
            kendra.deleteIndex({ Id: caseBenefitsIndex.Id }, function (error, data) {
                if (!error) {
                    console.log('Deleted successfully! There were no errors.');
                }
                else {
                    console.log('An error occurred while deleting: ');
                    console.log(error);
                }
                process.exit(0);
            });
        }
    }
});

