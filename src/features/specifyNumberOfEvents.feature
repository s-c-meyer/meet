Feature: Specify Number of Events
  Scenario: When user hasn't specified a number, 32 events are shown by default
    Given the user hasn't specified a number of events
    When the user opens the app
    Then the app will display 32 events by default

  Scenario: User can change the number of events displayed
    Given the user wants to change the amount of events shown
    When the user selects a number of events to display
    Then the app will display that many events, instead of the default