
export PROJECT_ID="$(gcloud config get-value project -q)"
gcloud docker -- push gcr.io/${PROJECT_ID}/nodedocker
