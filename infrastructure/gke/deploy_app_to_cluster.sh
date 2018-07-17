#!/bin/sh

export PROJECT_ID="$(gcloud config get-value project -q)"

kubectl run nodedocker-web --image=gcr.io/${PROJECT_ID}/nodedocker --port 8080