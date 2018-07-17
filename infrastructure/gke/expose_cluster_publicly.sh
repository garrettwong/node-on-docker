#!/bin/sh

kubectl expose deployment nodedocker-web --type=LoadBalancer --port 80 --target-port 8080

kubectl get service
