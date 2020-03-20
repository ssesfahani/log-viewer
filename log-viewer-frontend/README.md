# Log Viewer Frontend

This is where the frontend code lives that interacts with the API.

[https://i.imgur.com/yTeuZkr.png](Screenshot)

## Prerequisites

You will need the following things properly installed on your computer.

* [Node.js](https://nodejs.org/) (version >= 10)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `npm install -g ember-cli@2.18.2` (installs ember-cli)
* `npm install`

## Running / Development

* Make sure API is running first!
* `ember serve`
* Visit app at [http://localhost:4200](http://localhost:4200).

## Why Ember?
I chose to go with Ember.js for familiarity's sake. I briefly dabbled into React, Angular, and Vue, but realized exploring those options for the exercise would fall outside of the time window.

## About
The app talks to `localhost:3000` for the API. The API serves JSONAPI compliant payloads that the built in Ember serializers know what to do with. I used [https://materializecss.com/](MaterializeCSS) for some out of the box dirty styling, but otherwise, most of the table logic and component work is by hand.

## Features

* Fuzzy search over logs
* Filter by HTTP Method types
* Various sort options
* Pagination