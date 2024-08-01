# #!/bin/bash
# set -xe

# cd /src/project/frontend

# sudo rm sausage-store-front.tar.gz
# sudo rm -rf /etc/nginx/sites-available/default
# sudo rm -rf /var/www-data/dist/frontend

# sudo cp default /etc/nginx/sites-available/default

# curl -u ${NEXUS_REPO_USER}:${NEXUS_REPO_PASS} -o sausage-store-front.tar.gz ${NEXUS_REPO_URL}/repository/${NEXUS_REPO_FRONTEND_NAME}/${VERSION}/sausage-store-${VERSION}.tar.gz
# tar -zxf ./sausage-store-front.tar.gz || true
# sudo mkdir -p /var/www-data/dist/frontend
# sudo chown -R www-data:www-data /var/www-data/dist/frontend
# sudo cp -rf ./frontend/* /var/www-data/dist/frontend

# sudo systemctl daemon-reload
# sudo systemctl enable nginx
# sudo systemctl restart nginx

#! /bin/bash
set -xe
sudo docker login -u ${CI_REGISTRY_USER} -p ${CI_REGISTRY_PASSWORD} ${CI_REGISTRY}
sudo docker network create -d bridge sausage_network || true
sudo docker rm -f sausage-frontend || true
sudo docker run --rm -d --name sausage-frontend -p 80:80 \
     --network=sausage_network \
     "${CONTAINER_RELEASE_IMAGE}"
     # --env SPRING_DATASOURCE_URL="jdbc:postgresql://rc1a-zinvlo2snmixqvg6.mdb.yandexcloud.net:6432/std-ext-006-18?ssl=true" \
     # --env SPRING_DATASOURCE_USERNAME="std-ext-006-18" \
     # --env SPRING_DATASOURCE_PASSWORD="Testusr1234" \
     # --env SPRING_DATA_MONGODB_URI="mongodb://std-ext-006-18:Testusr1234@rc1a-yj97x7y7tq8wtm3q.mdb.yandexcloud.net:27018/std-ext-006-18?tls=true" \