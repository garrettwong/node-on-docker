#!/bin/sh

kubectl get deployment nodedocker-web -o yaml --export > myapp.yaml