# Core Administration Site for GetMoments.com

Created as a solution to the home assignment for GetMoments frontend position, this repository provides a part of the core administration site. Specifically, login page, page with user events and event details page. This solution implements all of the requirements (listed below).

In this project I got introductory experience with GraphQL and several frontend libraries: React Hook Form, React Firebase, Flowbite and Apollo.

########## Assignment ##########

# Get Moments Frontend Test Case

Get Moments Admin - core
# Description
Create a basic React project as a core of Administration site for project GetMoments.com

Get Moments project:
allows fans at music and sport events to record videos and send them via mobile app to our cloud,
we create a video cut composed of these user-generated videos and deliver it back to the users
they can share it on social media

The purpose of the administration site is to allow organizers to create & manage events and to see info about the past events (statistics, download user videos etc.)

In the test case, the graphics and UX are not important, just focus on the following functionality:
* login using Firebase
* list all user's events (using this API endpoint): https://api.dev.getmoments.com/docs/#query-myEvents
* print info about each event (similar to the mobile app home screen)
* display event detail (similar to the mobile app event detail)

The API is GraphQL and here is documentation: https://api.dev.getmoments.com/docs/ 

###########################################################################
# Getting Started

## Before build

This project requires firebase config in /src/utils/firebase-config.tsx. The content of firebase-config.tsx should be similar to firebase-config.example.tsx with firebaseConfig object properties filled in with data from firebase.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
