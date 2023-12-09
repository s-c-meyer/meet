# Meyer's Meet App :calendar:

This app is hosted using gh-pages at: https://s-c-meyer.github.io/meet/

*Please keep in mind you will have to login with Google Credentials to see the demo above.*

If you would rather not login with your credentials there is a video demo below:


https://github.com/s-c-meyer/meet/assets/127259009/891991eb-a90a-4add-98c4-6e982456e99d


This serverless, progressive web application was built using React with a test-driven development technique. It uses the Google Calendar to fetch upcoming events. 

## Key Features

- Users may install the app on desktop or add app to smart phone home screen
- Includes data visualization to see Event Topics and Locations at a glance
- Works offline or in slow network conditions, using a service worker
- Uses serverless functions for authorization

# User Stories and Scenarios

## Feature 1: Filter Events by City 
As a user  
I should be able to filter events by city  
So that I can see events in that specific city  

### Scenario 1: When user hasn't searched for a city, show upcoming events from all cities
Given the user opens the app  
When they haven't searched for anything  
Then the app should display upcoming events from all cities 

### Scenario 2: User should see a list of suggestions when they search for a city
Given the user wants to search for a city  
When the user searches for a city  
Then they should see a list of suggestions regarding that city 

### Scenario 3: User can select a city from the suggested list 
Given the user searches for a city  
When the suggestions are displayed  
Then the user should be able to select from that list of suggestions

## Feature 2: Show/Hide Event Details
As a user  
I should be able to click a button  
So that event details are either hidden or revealed

### Scenario 1: An event is collapsed by default
Given the user opens the app  
When they open the app and haven't clicked on anything  
Then the events should all be collapsed, not showing extra details 

### Scenario 2: User can expand an event to see details
Given the user opens the app and hasn't clicked on an event  
When they click on "Show Details"  
Then the event element will expand to show details

### Scenario 3: User can collapse an event to hide details
Given an event element is expanded  
When the user clicks on "Hide Details"  
Then the event element will collapse to hide the details

## Feature 3: Specify number of events 
As a user  
I should be able to select a number of events  
So that the number I selected is the number of events displayed

### Scenario 1: When user hasn't specified a number, 32 events are shown by default
Given the user hasn't specified a number of events  
When the user opens the app  
Then the app will display 32 events by default

### Scenario 2: User can change the number of events displayed
Given the user wants to change the amount of events shown  
When the user selected a number of events to display  
Then the app will display that many events, instead of the default

## Feature 4: Use the App when offline
As a user not connected to the internet  
I should be able to use the app, despite having no internet  
So that I can use the app on the go, without the need for internet access 

### Scenario 1: Show cached data when there's no internet connection
Given the user opens the app  
When there is no internet connection and data has been cached  
Then the user will be able to see that cached data, despite not having internet connection

### Scenario 2: Show error when user changes search settings (city, number of events)
Given the user wants to change the search settings  
When there is no internet connection  
Then the app will display an error message  

## Feature 5: Add an app shortcut to the home screen
As a user  
I should be able to add a shortcut to this app to my home screen  
So that I can access the app conveniently and quickly  

### Scenario 1: User can install the meet app as a shortcut on their device home screen
Given the user wants to access the app and has a home screen  
When the user adds a shortcut to their home screen  
Then a shortcut will appear on their home screen  

## Feature 6: Display charts visualizing event details
As a user  
I should be able to see a chart visualizing event details  
So that I can see event details about a certain city at a glance

### Scenario 1: Show a chart with the number of upcoming events in each city
Given the user opens the app  
When the user looks at the chart displayed on the homepage  
Then the user should be able to see details about events at a glance



