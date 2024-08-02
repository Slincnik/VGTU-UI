#! /bin/bash
set -xe
sudo docker login -u $DOCKER_HUB_USER -p $DOCKER_HUB_PASSWORD docker.io
sudo docker network create -d bridge cchgeu_network || true
sudo docker rm -f cchgeu-frontend || true
sudo docker run --rm -d --name cchgeu-frontend -p 80:80 \
     --network=cchgeu_network \
     "${CONTAINER_RELEASE_IMAGE}"