# Health-Track


## Team Members

- Joshua Constine Project manager
- Reuban Guillen Design manager
- Stephen Parker Database manager
- Anthony Corona Test manager
- Mohamed Boughou Sofrtware developer
- Talia Goody Requirements manager
- Omar Bazr Requirements manager
- Kane Cruz-Walker Software developer

## System Requirements

- Docker installed



## Running the project
- clone the repo https://github.com/joshconstine/Health-Track

-navigate to the project via terminal and execute

- docker-compose up
This may need to be ran as su
- sudo docker-compose up

- open docker desktop and to verify all containers are running
![alt text](<Screenshot 2024-09-06 at 14.54.04.png>)

from here you can have command line access into any of the containers. 

## Database setup
The first time you start the project, We will need to seed the database with the project schema.

- establish a connection to the db container.

- execute the /db/schema.sql file to seed the tables

- executed the /db/seed/patients.sql file to insert the patients


## connected to db 
once the db container is running you can can connect 
using a range of tools

the port and admin login information can be found in the docker-compose file

