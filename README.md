# Smartch Backend Coding Exercise

Welcome :) !
 
We're building our tech team and no matter your skill level, we need you to try and follow these instructions to build a small application that will show us your coding methods and proficiency.

You can spend how much time you think you need on this exercise, but we believe that if you are senior or mid-level, this should take around 3 hours. 

## General instructions
- Fork this project on github
- Clone it to your own repository `git clone https://github.com/YOUR_USERNAME/smartch`
- Commit often. We need to be able to discuss your commits during the debrief interview
- You can use as many third-party libraries as needed, we will discuss why you did so
- The app does *not* have to be beautiful (but plenty of frontend libraries and UI kits can make it look good without much effort)
- Use React for the front, and NodeJS for the backend (We will be using [NestJS](https://nestjs.com/) in the team, if you want to give it a try)

## Instructions
Build a small website that will display by default the last 10 movies available in theatres from [The Movie Database](https://developers.themoviedb.org/3/getting-started/introduction) and allow the user to save a watchlist of movies or search a specific movie.

There should be a text input at the top to search for movie names that should search within the entire database, not just the page.
 
The current user should should be able to "Like" each movie to keep it in a list that stays available if the page is refreshed :
- Likes should be saved in a database (not in localstorage) and a user should not be able to save a movie twice
- An email should be sent every time there's a like *through a job-queue*. The email should include the name of the movie that was just liked. You can use a fake SMTP service like https://ethereal.email/ to to configure your SMTP.


## Extra points (means extra time!)

- The search input can have an autocomplete mechanism to autocomplete the movie titles while I am typing.
- Implement user authentication
- Dockerize the application
- You want to show off your front-end skills as well ? Use Chakra UI and Storybook (or else), and make it shine !

## API access
We sent you an API key by email. Because this is the key we send to all candidates, it might reach its quota. If this is the case you can register to the MovieDatabase [here](https://www.themoviedb.org/signup) and apply for a developer api key [here](https://www.themoviedb.org/settings/api)

## Judging
The coding challenge will be judged on:
-   Architecture and approach
-   Attention to detail
-   Code readability
-   Knowledge of modern Javascript and frameworks
-   The results we are expecting vary deeply depending on your profile. We are not expecting the same quality for a senior or a junior, so don't panic and do your best :)