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

* While in log-viewer-api `docker-compose up -d`
* While in log-viewer-frontend `ember serve`
* Visit app at [http://localhost:4200](http://localhost:4200).