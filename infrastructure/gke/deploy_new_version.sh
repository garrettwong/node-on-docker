#!/bin/sh

export PROJECT_ID="$(gcloud config get-value project -q)"
export APP_NAME="nodedocker"
export DEPLOYMENT_NAME="nodedocker-web"
export VERSION="v3"


docker build -t gcr.io/${PROJECT_ID}/${APP_NAME}:${VERSION} .

gcloud docker -- push gcr.io/${PROJECT_ID}/${APP_NAME}:${VERSION}

kubectl set image deployment/${DEPLOYMENT_NAME} ${DEPLOYMENT_NAME}=gcr.io/${PROJECT_ID}/${APP_NAME}:${VERSION}