# 🔎 Log Viewer

`As an administrator of a Ruby on Rails based website, I can browse and search through my log files to examine customer browsing patterns or debug an issue.`

Log Viewer features a fully working API (using TypeScript, NodeJS, and NestJS), frontend (using Ember.js), and database (using PostgreSQL). One of my main goals was also to make setting up the stack as easy as possible, so I Dockerized the API as much as I could.

## Prerequisites

You will need the following things properly installed on your computer.

* [Docker](https://www.docker.com/) (v18.06.0+)
* [Node.js](https://nodejs.org/) (v10+)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `npm install -g ember-cli@2.18.2` (installs ember-cli)
* `cd log-viewer-frontend && npm install`

## Running / Development

* From log-viewer-api/, `docker-compose up -d --build`
  * This might take a while as it will need to download a PostgreSQL image and Node image and then build the image.
  * Upon startup, the API also 1) truncates the `logs` table in Postgres and then 2) seeds the `logs` table from the `sample.log` file
  * Once it completes go to [http://localhost:3000/api](http://localhost:3000/api). If it succeded, it you should be at the Swagger UI which lists all the endpoints, params, and even allows you to hit the API.
* From log-viewer-frontend/, `ember serve`
  * Assuming all `node_modules` were built properly, you should get a green `Build successful` message
* Visit app at [http://localhost:4200](http://localhost:4200).
