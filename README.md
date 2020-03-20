# 🔎 Log Viewer

Log Viewer is a fully working web app using:
* NestJS (Node.js framework) in TypeScript
* Ember.js
* PostgreSQL
* Docker

One of my main goals was also to make setting up the stack as easy as possible, so I Dockerized the API as much as I could.

## Features

* Swagger documentation and UI setup
* Unit tests where appropriate
* Fuzzy search over logs
* Filter by HTTP Method types
* Various sort options
* Pagination

## Prerequisites

You will need the following things properly installed on your computer.

* [Docker](https://www.docker.com/) (v18.06.0+)
* [Node.js](https://nodejs.org/) (v12+)
* [Google Chrome](https://google.com/chrome/)

## Installation / Running

* Clone this repo down and make sure you are on Node 12 (`node -v`)
* `npm install -g ember-cli@2.18.2` (installs ember-cli)

### API
* `cd log-viewer-api/`
* `docker-compose -f docker-compose.prod.yml up -d --build`
  * This might take a while as it will need to download a PostgreSQL image and Node image and then build the image.
  * Upon startup, the API also 1) truncates the `logs` table in Postgres and then 2) seeds the `logs` table from the `sample.log` file (just to get a clean start every time)
  * Once it completes go to [http://localhost:3000/api](http://localhost:3000/api). If it succeded, it you should be at the Swagger UI which lists all the endpoints, params, and even allows you to hit the API.
  
### Frontend
* `cd ../log-viewer-frontend/`
* `npm install`
* `ember serve`
  * Assuming all `node_modules` were built properly, you should get a green `Build successful` message
* Visit app at [http://localhost:4200/log-viewer](http://localhost:4200/log-viewer).

## Notes/TODOs

* Certain parts of the code were not unit tested as they were more appropriately tested with e2e tests. Due to time constraints, I forewent implementing e2e tests
* The majority of my time was spent on the API as I didn't want the UI to drive the API design
* NestJS was still somewhat new to me, so a lot of my time was spent learning the framework, but definitely the right call!
* Dockerizing for local development (transpiling, hot reloading, running in a container, etc.) is also supported and that also took up a ton of time (TypeScript also makes everything a little more tricky). I provided no docs on there, but feel free to poke at the `docker-compose.yml` files, the `.vscode` folder, and of course the `Dockerfile`.
