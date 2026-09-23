server {
    server_name app.connectus.mu;

    root /var/www/connectus/app;
    index index.html index.htm index.php;

    # Enable Gzip compression (equivalent to Apache mod_deflate)
    gzip on;
    gzip_types text/plain text/css text/javascript application/javascript application/x-javascript text/xml application/xml application/xhtml+xml application/rss+xml;
    gzip_vary on;
    
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    # Process PHP files
    location ~ \.php$ {
        include fastcgi_params;
        fastcgi_pass unix:/run/php/php-fpm.sock;  # Adjust as needed
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
    }

    # Set browser caching (equivalent to Apache mod_expires)
    location ~* \.(jpg|jpeg|gif|png|ico|css|js|woff|woff2|ttf|svg)$ {
        expires 1y;
        add_header Cache-Control "public, max-age=31536000";
    }

    location ~* \.(xml)$ {
        expires 2d;
        add_header Cache-Control "public, max-age=172800";
    }

    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/app.connectus.mu/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/app.connectus.mu/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
server {
    if ($host = app.connectus.mu) {
        return 301 https://$host$request_uri;
    } # managed by Certbot


    listen 80;
    server_name app.connectus.mu;
    return 404; # managed by Certbot


}