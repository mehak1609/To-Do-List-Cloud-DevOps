# Use Nginx as base image
FROM nginx:alpine

# Copy frontend files to nginx directory
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
