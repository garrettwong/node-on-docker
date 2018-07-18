# Node.js Docker - Hello World

Tutorial Reference:
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/
- https://cloud.google.com/kubernetes-engine/docs/tutorials/hello-app

Pre-requisites:
- docker 18.05 (download from docker site online)
- kubectl 1.9.7 (download using gcloud components install kubectl)

# Quickstart
* Run Locally
```javascript
node server.js
open http://localhost:8080
```
* Run via Docker
```bash
infrastructure/docker_run.sh
```

* Deploy to GKE Cluster
```bash
# you need to manually bump the version

infrastructure/gke/deploy_new_version.sh
```

_Included below are notes that aren't necessary to run_

# Notes
```bash
docker images
docker run -p 49160:8080 -d garrettwong/nodedocker
```

# Get container ID
```bash
$ docker ps
```

# Print app output
```bash
$ docker logs <container id>
```

# Example
Running on http://localhost:8080

```bash
$ docker exec it <container id> /bin/bash
$ open localhost:49160
```


### On push to master, a trigger creation of a docker image via GCP Build Triggers
### A build trigger has been added at the project path: cloud-build/builds
### This will create an image in the gcr.io project container registry
```bash
$ git push -u origin master
```
test
