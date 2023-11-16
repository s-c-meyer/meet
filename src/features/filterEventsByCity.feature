Feature: Filter events by city
  Scenario: When user hasn't searched for a city, show upcoming events from all cities.
    Given the user opens the app
    When they haven't searched for anything
    Then the App should display upcoming events from all cities

  Scenario: User should see a list of suggestions when they search for a city
    Given the user wants to search for a city
    When the user searches for a city
    Then they should see a list of suggestions regarding that city
    
  Scenario: User can select a city from the suggested list
    Given the user searches for a city
    And the list of suggested cities is shown
    When the suggestions are displayed
    Then the user should be able to select from that list of suggestions
    And their city should be changed to that city (i.e., "Berlin, Germany")