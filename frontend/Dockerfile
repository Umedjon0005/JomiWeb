FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_API_URL=/api
ARG VITE_MEDIA_URL
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_MEDIA_URL=${VITE_MEDIA_URL}
RUN npm run build

FROM nginx:alpine

# Install gettext for envsubst and bash for conditional logic
RUN apk add --no-cache gettext bash

# Create SSL directory
RUN mkdir -p /etc/nginx/ssl

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY nginx-ssl.conf /etc/nginx/templates/ssl.conf.template

EXPOSE 80 443

# Startup script that conditionally includes SSL config
RUN echo '#!/bin/sh' > /docker-entrypoint.sh && \
    echo 'if [ -f /etc/nginx/ssl/certificate.crt ] && [ -f /etc/nginx/ssl/private.key ]; then' >> /docker-entrypoint.sh && \
    echo '  echo "SSL certificates found, enabling HTTPS..."' >> /docker-entrypoint.sh && \
    echo '  envsubst '"'"'$$BACKEND_HOST'"'"' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo '  envsubst '"'"'$$BACKEND_HOST'"'"' < /etc/nginx/templates/ssl.conf.template >> /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo '  echo "HTTP to HTTPS redirect enabled"' >> /docker-entrypoint.sh && \
    echo '  sed -i "/listen 80;/a\\    return 301 https://\\$host\\$request_uri;" /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo 'else' >> /docker-entrypoint.sh && \
    echo '  echo "SSL certificates not found, serving HTTP only..."' >> /docker-entrypoint.sh && \
    echo '  envsubst '"'"'$$BACKEND_HOST'"'"' < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf' >> /docker-entrypoint.sh && \
    echo 'fi' >> /docker-entrypoint.sh && \
    echo 'nginx -g "daemon off;"' >> /docker-entrypoint.sh && \
    chmod +x /docker-entrypoint.sh

CMD ["/docker-entrypoint.sh"]

