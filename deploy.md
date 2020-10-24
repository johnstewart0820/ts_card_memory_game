This document explains how to deploy to the ubuntu server.

### The goal

Deploy the front end of the matching game to the ubuntu.

### Pre-requirements

- [x] Ubuntu Server

### How to deploy

We are going to use PM2, nginx to deploy it.

#### Install Node.js

To run the Next.js application, we need to have Node.js installed on the Ubuntu server. We need to have Node.js version 10.13 or later for Next.js to work properly.

To make things easy, we'll use the NodeSource package archives to install Node.js.

First, we need to install the NodeSource PPA (Personal Package Archive) to get access to its contents. Make sure it's the home directory on the Ubuntu server:

```
cd ~
curl -sL https://deb.nodesource.com/setup_12.x -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo rm nodesource_setup.sh
```

We can now install Node.js.

```
sudo apt-get install nodejs
```

Make sure it's installed properly

```
node --version
npm --version
```

#### Deploy the code to the server

##### Copy the code

We have to copy the code to the Ubuntu server.
To do this, I suggest to push the code to Github.

```
cd ~
git clone https://github.com/github_link
```

Then we have to make the `.env` file with correct values.
Create `.env` file and then write the values.

```
NEXT_PUBLIC_BACKEND_BASE_URL=http://localhost:8000
NEXT_PUBLIC_WEBSOCKET_URL=ws://localhost:8000/ws
```

##### Making the build

First, build the Nextjs.

```
npm install
npm run build
```

After that, we start the server by running :

```
npm start
```

If everything is fine, you can see something like the below :

```
Ready on http://localhost:3000
```

#### Deploy PM2

```
sudo npm install -g pm2
```

Let's say the github reponsitary name is `matching_game`. Then you will have a directory `matching_game`.

Run the following commands to start NextJs application using PM2.

```
cd matching_game
pm2 start --name=matchinggame npm -- start
```

#### Configure Nginx

Now the application is running and listening on localhost:3000, we need to make it so people from the outside world can access it. To achieve this, we will use Nginx as a reverse-proxy.

Nginx server configuration files are stored in /etc/nginx/sites-available directory, which are enabled through symbolic links to the /etc/nginx/sites-enabled directory.

First, navigate to the /etc/nginx/sites-available directory:

```
cd /etc/nginx/sites-available
```

Then, create a new configuration file for your website (you'll need to use sudo for any changes you make in these configuration files):

```
sudo touch matchinggame.com
```

And then edit it using `nano`.

```
sudo nano example.com
```

Add this code to the file:

```
server {
    listen 80;
    listen [::]:80;

    root /var/www/html;
    index index.html index.htm index.nginx-debian.html;

    server_name matchinggame.com www.matchinggame.com;


    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Save and exit the file.
Now that we have the server block file created, we need to enable it. We can do this by creating symbolic links from these files to the /sites-enabled directory, which Nginx reads from during startup.

We can create the symbolic link with this command:

```
sudo ln -s /etc/nginx/sites-available/matchinggame.com /etc/nginx/sites-enabled/
```

Now it's deployed.
