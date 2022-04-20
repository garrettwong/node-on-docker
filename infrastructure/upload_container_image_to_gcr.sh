
export PROJECT_ID="$(gcloud config get-value project -q)"

docker push gcr.io/${PROJECT_ID}/node-on-docker
