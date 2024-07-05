#! /bin/bash
set -xe

cd /home/slincnik/Testfront/deploy

# Обновляем конфигурацию Nginx для работы с файлами фронта
sudo cp -rf front.conf /etc/nginx/sites-enabled/

# Перезапускаем фронт
sudo systemctl daemon-reload
sudo systemctl enable nginx
sudo systemctl restart nginx