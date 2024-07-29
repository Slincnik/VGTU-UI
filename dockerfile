# Stage 1
FROM node:20.16-alpine3.20 AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/scr/app
COPY package.json pnpm-lock.yaml ./

# Stage 2
FROM builder AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

# Stage 3
FROM builder AS build
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Stage 4
FROM nginx:1.27.0-alpine
COPY deploy/front.conf /etc/nginx/conf.d/default.conf
COPY --from=prod-deps /usr/scr/app/node_modules /var/www-data/dist/frontend
COPY --from=build /usr/scr/app/dist /var/www-data/dist/frontend
EXPOSE 80