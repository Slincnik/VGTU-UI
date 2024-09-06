# Stage 1
FROM node:20.16-alpine3.20 AS builder
WORKDIR /usr/scr/app
COPY package.json ./
COPY . .
RUN npm install --ignore-scripts
RUN pnpm run build

# Stage 2
FROM nginx:1.27.0-alpine
COPY deploy/front.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/scr/app/dist /var/www-data/dist/frontend
EXPOSE 80