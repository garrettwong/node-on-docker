# Node.js Docker - Hello World

Tutorial Reference:
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/

docker images
docker run -p 49160:8080 -d garrettwong/test-tracker

# Get container ID
$ docker ps

# Print app output
$ docker logs <container id>

# Example
Running on http://localhost:8080

$ docker exec it <container id> /bin/bash

$ open localhost:49160



# On push to master, a trigger creation of a docker image via GCP Build Triggers
$ git push -u origin master
