## Preamble

Let's ignore the question as to whether or not this is a good idea to begin with...

## Use Case

As an administrator of a Ruby on Rails based website, I can browse and search through my log files to examine customer browsing patterns or debug an issue.

## The Solution

Let's build an application to manage the data contained in a log file (sample provided) in a relational database so it's easier to query and analyze.

## Technology Requirements + Delivery

Note that each log in the application is tagged with a request UUID to allow you to associate request logs that span multiple lines to the actual request made.

Use any technologies you deem appropriate to handle the use case, but focus on the parts of the problem that matter to you. Think of what an admin might want to search for, and ensure that there is some basic interface for the admin to view the 100 most recent logs.

Just don't write a one-line document saying "I'd push to Loggly." We know about Loggly. :wink:

If it's not immediately obvious to a newcomer how to run the application, include a small README that documents dependencies/steps to get it up and running.

Deliver as a ZIP file/tar.gz/GitHub code repo. Whatever works.

## Time Allotment

Please don't spend any more than 8 hours on this. There are obviously a lot of things that could be added to this app, and the goal is to simulate a semi-real life project where you don't always have the time to add everything you want to. Triage and prioritization of core functionality is important.

