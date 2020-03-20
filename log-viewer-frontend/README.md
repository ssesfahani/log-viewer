# Log Viewer Frontend

This is where the frontend code lives that interacts with the API.

[Screenshot](https://i.imgur.com/yTeuZkr.png)

## Why Ember?
I chose to go with Ember.js for familiarity's sake. I briefly dabbled into React, Angular, and Vue, but realized exploring those options for the exercise would fall outside of the time window.

## About
The app talks to `localhost:3000` for the API. The API serves JSONAPI compliant payloads that the built in Ember serializers know what to do with. I used [MaterializeCSS](https://materializecss.com/) for some out of the box dirty styling, but otherwise, most of the table logic and component work is by hand.

## Features

* Fuzzy search over logs
* Filter by HTTP Method types
* Various sort options
* Pagination