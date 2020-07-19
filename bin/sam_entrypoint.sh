#!/bin/bash
set -o errexit
BASEDIR="$1"
/usr/local/bin/sam local start-lambda \
  --template template.yaml \
  --host 0.0.0.0 \
  --docker-volume-basedir "${BASEDIR}" \
  --skip-pull-image