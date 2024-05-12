# Information on how to create the https server certificate on windows and linux machine

*** 

To generate the https server certificates you firstly have to make sure that you have openssl. In linux you have this by default. However, in windows you will have to download it
and install it using the instructions in this tutorial: https://www.youtube.com/watch?v=bguFKIgEpoM.

***

After installing the openssl navigate to the server directory and apply the following commands in that order: 

1 - openssl genpkey -algorithm RSA -out localhost.key
2 - openssl req -new -key localhost.key -out localhost.csr
3 - openssl x509 -req -days 365 -in localhost.csr -signkey localhost.key -out localhost.crt

When applying these commands you will be asked some questions that are just a routine procedure and you don't need to worry too much about them. After finishing this procedure
use "npm start" to start the server. To communicate with the server through the react app use the Firefox browser since Chrome has a problem with self signed certificates. 

Command to start the react app in https: ($env:HTTPS = "true") -and (npm start)