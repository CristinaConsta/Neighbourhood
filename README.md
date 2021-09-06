# Neighbourhood watch

This project is a proof-of-concept for an MVC web application, using MongoDB and Nodejs.

## Prerequisites

Install Visual Studio Code - https://code.visualstudio.com/download
Install nodejs - https://nodejs.org/en/download/

### Getting started

Open Visual Studio Code.
Clone this repository using the command - git clone https://github.com/CristinaConsta/Neighbourhood.git
Install the dependencies:
 - npm install mongoose (the ORM used for interaction with MongoDB database) https://mongoosejs.com/docs/
 - npm install express (the NodeJs framework I have used) https://expressjs.com/
 
### Test and run  - run remotely

Access HTTPS://WARM-RETREAT-16015.HEROKUAPP.COM and test the project on Heroku.

### Development and test - run locally 

In .env modify the variable PORT to WEB_PORT. By default I settup the port=80, to work on Heroku platform. WEB_PORT is used to run it locally. 

In app.js modify the variable PORT to WEB_PORT;

In .env modify PORT=80 to WEB_PORT=your chosen port;

In terminal run - npm run dev and follow the localhost link.