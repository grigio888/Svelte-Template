# Use the official NGINX image from the docker hub
FROM nginx:1.25.3-alpine

# Set Environment Variables
ENV production=false

# Copying NGINX files related to our project
COPY nginx.conf /etc/nginx/nginx.conf
COPY sites-enabled /etc/nginx/sites-enabled
COPY templates /etc/nginx/templates

# Starting NGINX
CMD ["nginx", "-g", "daemon off;"]