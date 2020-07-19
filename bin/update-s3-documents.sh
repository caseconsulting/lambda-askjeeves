#!/bin/bash

BUCKET_NAME='case-consulting-benefits-bucket'
echo "Uploading all files in the documents folder to S3 bucket: ${BUCKET_NAME}"
aws s3 cp ./documents s3://${BUCKET_NAME}/ --recursive