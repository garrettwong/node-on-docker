#!/bin/sh

kubectl scale deployment nodedocker-web --replicas=3

kubectl get deployment nodedocker-web

kubectl get pods