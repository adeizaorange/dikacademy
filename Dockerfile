# Optional. Use this with Coolify's "Dockerfile" build pack if you want caching and security headers.
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY . /usr/share/nginx/html
EXPOSE 80
