# Node.js Docker - Hello World

## Tutorial References

- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
- https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app

## Pre-requisites

- docker 18.05 (download from docker site online)
- kubectl 1.9.7 (download using gcloud components install kubectl)
- node8+

## Getting Started

### Run Locally

```bash
npm install
npm start
open http://localhost:8080
```

### Run via Docker

```bash
infrastructure/docker_run.sh
```

## Deploying to GKE

```bash
# gcloud auth login --activate-service-account ${...}

CLUSTER_NAME="gke-nodeondocker"
gcloud container clusters get-credentials $CLUSTER_NAME
infrastructure/gke/deploy_new_version.sh
```

## General Notes

*List docker images*

```bash
docker images
docker run -p 49160:8080 -d garrettwong/nodeondocker
```

*Get container ID*

```bash
docker ps
```

*Print app output*

```bash
docker logs <container id>
```

*Exec into a container*

```bash
docker exec it <container id> /bin/bash
open localhost:49160
```

### Build Triggers

On push to master, a trigger creation of a docker image via GCP Build Triggers.

A build trigger has been added at the project path: cloud-build/builds
This will create an image in the gcr.io project container registry

```bash
git push -u origin master
```
