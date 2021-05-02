Would You Rather Project
---------------------------------------------------------

## Introduction
In the "Would You Rather?" Project, the game goes like this: A user is asked a question in the form: “Would you rather [option A] or [option B] ?”. Answering "neither" or "both" is against the rules.

## Overview
In this application, the main page displays a login page if a user isn't logged in. Once the user logs in, two lists of "questions" (i.e. answered and unanswered polls) are displayed at `/` (the root URL), each of which contains polls of questions that are arranged from the most recently created (top) to the least recently created (bottom). The user should be able to toggle between answered and unanswered polls. Each polling question should link to the details of that poll. The details of each poll should be available at `/questions/:question_id`. 

When a poll is clicked on the home page, the following is shown:

-Text “Would You Rather”
-Avatar of the user who posted the polling question
-Two options


For answered polls, each of the two options contains the following:

-Text of the option
-Number of people who voted for that option
-Percentage of people who voted for that option
-The option selected by the logged-in user should be clearly marked

The application shows a 404 page if the user is trying to access a poll that does not exist. It also displays a navigation bar so that the user can easily navigate anywhere in the application.
Upon voting in a poll, all of the information of an answered poll is displayed. The user’s response is recorded and clearly visible on the poll details page. Users can only vote once per poll; they aren't allowed to change their answer after they’ve voted -- no cheating allowed! When the user comes back to the home page, the polling question appears in the “Answered” tab.

The form for posting new polling questions is available at the `/add` route. The application shows the text “Would You Rather” and have a form for creating two options. Upon submitting the form, a new poll should be created, the user is taken to the home page, and the new polling question should appear in the correct category on the home page.

The application has a leaderboard that’s available at the `/leaderboard` route. Each entry on the leaderboard contains the following:

-User’s name
-User’s picture
-Number of questions the user asked
-Number of questions the user answered

Users are ordered in descending order based on the sum of the number of questions they’ve asked and the number of questions they’ve answered. The more questions you ask and answer, the higher up you move.

The user is able to navigate to the leaderboard, to a specific question, and to the form that allows the user to create a new poll both from within the app and by typing in the address into the address bar. the application should requires the user to be signed in order to access those pages.

## Build Tools
* HTML
* CSS
* React
* React Redux

## Installing All Required Packages
- `npm install`

## To Run Project
- cd into the root folder and run
- `npm start`

Open browser at http://localhost:3000/
