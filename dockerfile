# Stage 1
FROM node:20.16-alpine3.20 AS builder
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
WORKDIR /usr/scr/app
COPY package.json pnpm-lock.yaml ./
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install -P --frozen-lockfile --ignore-scripts
RUN pnpm run build

# Stage 2
FROM nginx:1.27.0-alpine
COPY deploy/front.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/scr/app/dist /var/www-data/dist/frontend
EXPOSE 80