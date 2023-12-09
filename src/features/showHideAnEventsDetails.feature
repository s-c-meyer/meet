Feature: Show/Hide Event Details
  Scenario: An event is collapsed by default
    Given the user opens the app
    When they open the app and haven't clicked on anything
    Then the events should all be collapsed, not showing extra details

  Scenario: User can expand an event to see details
    Given the user opens the app and hasn't clicked on an event
    When they click on "Show Details"
    Then the event element will expand to show details

  Scenario: User can collapse an event to hide details
    Given an event element is expanded
    When the user clicks on "Hide Details"
    Then the event element will collapse to hide the details