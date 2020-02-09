# Crypto Store
Get fork and make changes then create a pull request.

## Prerequisite
Developer must to know about following libraries
- expressjs
- knex / bookshelf / objection
- express validation
- swagger

## Requirements
-  git
-  Docker
    - NodeJs 12.x.x
    - postgres
    - docker-compose

## How to make
- Goto directory
- Run docker pull postgres
- Run docker-compose up -d --build
- Run docker-compose start this will run on port 80

## File structure
- config (All config files contain there)
    - app
    - database
    - etc
- library (All library / wrappers contain there)
- server 
    - messages (Where contains all error or success messages)
    - middlewares (All middlewares either call before and after all are there)
    - routes (All modules living there,  this is moduler hierarchy we can break it into lots of part)


# How to Contribute 
1. Make a fork & get a clone.
2. Read project tagline & read technologies which is used in project.
3. Before creating a pull request get latest fetch.