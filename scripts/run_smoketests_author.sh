#!/bin/bash

set -evuf -o pipefail

# Read test env vars
export $(egrep -v '^#' .env.test | xargs)

# Build a version of the app which runs with the mockAPI
REACT_APP_ENABLE_AUTH=false yarn build:mockAPI

# Serve the app
./node_modules/.bin/serve -S -p 3000 build/ &
pid=$!

function finish {
  echo "Shutting down the server..."
  kill -s SIGKILL $pid
}
trap finish INT KILL TERM EXIT

# Wait for server to start listening
./node_modules/.bin/wait-on $CYPRESS_baseUrl -t 10000

# Run the tests
yarn smoketest:author
