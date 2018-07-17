#!/bin/sh

export PROJECT_ID="$(gcloud config get-value project -q)"

infrastructure/build.sh

docker run --rm -p 8080:8080 gcr.io/$PROJECT_ID/nodedocker
