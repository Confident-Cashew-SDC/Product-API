# Product-API

Getting Started 
Npm: Npm install
Server: npm run start:dev (Run in development mode)
        npm run start (Run in production mode)
        
        
Usage:
 The get route for /products will return all products of a page (default page one, count 5). Will return a specific product with a product_id parameter included. 
 The get route for /products/styles will return the styles of a specific product. product_id must be passed as a query parameter.
 The get route for /products/related will return a list of product ids of related products. product_id must be passed as a query parameter. 
 
 
 Products-API:
 The overview of this project was to expand the backend of our previous Project Catwalk to support a greater number of virtual visitors. We need to implement a back-end that can scale to meet the demands of frequent visitor traffic and send the data formatted, the way Project Catwalk frontend was designed to receive it.
 
Overview:
I used a postgres database to store the data uploaded from csv files. I utilized docker to create an image of my back-end server and upload it to docker hub, and deploy it on my AWS ec2 instance by pulling from docker hub. I used k6 to stress test my server locally, and used loader.io to stress test the server when deployed to ec2 instance. I implemented load balancing by incorporating Nginx to use round-robin to send requests to different ec2 instances. 

<img width="1290" alt="Screen Shot 2022-01-22 at 3 40 03 PM" src="https://user-images.githubusercontent.com/81985980/150840277-b65a5dac-8347-4963-b6d9-56a2434ebf6c.png">

Currently with two ec2 server instances running, my site is able to handle 500 Vus over 15 seconds very well with an average response time of 69ms.

<img width="1218" alt="Screen Shot 2022-01-22 at 3 55 25 PM" src="https://user-images.githubusercontent.com/81985980/150840882-05be9730-2d59-411c-9a4b-a85a5bb9b748.png">

At around 775 Vus over 15seconds is when my two servers start to slow down the average response time. I would need to add more servers or scale the servers vertically to accomodate more virtual users.


Acknowledgments:
Postgres
K6
NewRelic
Nginx
Loader.io
Docker
 
