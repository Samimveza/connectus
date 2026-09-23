# Redirect HTTP www.connectus.mu → https://connectus.mu
server {
    listen 80;
    server_name www.connectus.mu;

    return 301 https://connectus.mu$request_uri;
}

# Redirect HTTP connectus.mu → HTTPS
server {
    listen 80;
    server_name connectus.mu;

    return 301 https://connectus.mu$request_uri;
}

# Redirect HTTPS www.connectus.mu → https://connectus.mu
server {
    listen 443 ssl;
    server_name www.connectus.mu;

    ssl_certificate /etc/letsencrypt/live/app.connectus.mu/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/app.connectus.mu/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    return 301 https://connectus.mu$request_uri;
}


server {
    server_name connectus.mu;

    root /var/www/connectus/landing;
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
