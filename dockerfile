# Stage 1
FROM node:20.16-alpine3.20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/scr/app

COPY package.json pnpm-lock.yaml ./
COPY . .

RUN pnpm install --frozen-lockfile --ignore-scripts
RUN pnpm run build

# Stage 2
FROM nginx:1.27.0-alpine
COPY deploy/front.conf /etc/nginx/conf.d/default.conf
COPY --from=base /usr/scr/app/dist /var/www-data/dist/frontend
EXPOSE 80