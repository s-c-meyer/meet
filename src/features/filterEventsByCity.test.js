import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor } from '@testing-library/react';
import App from '../App';
import { getEvents } from '../api';
import userEvent from '@testing-library/user-event';

const feature = loadFeature('./src/features/filterEventsByCity.feature');
//loadFeature expects the path to start from the root of the project, not relative to this file

//first step for defineFeature should always be to run it empty, the test error will provide exactly the code you need inside the function. 
//But be careful only to add each test separately. There will be text preceding each test ("Feature file has a scenario titled...."), you do NOT want to include this
defineFeature(feature, test => {
  test('When user hasn\'t searched for a city, show upcoming events from all cities.', ({ given, when, then }) => {
    let AppComponent; //this is defined outside of the given, when, then functions because you will need it more than locally in one function
    given('the user opens the app', () => {
        AppComponent = render(<App />);
    });

    when('they haven\'t searched for anything', () => {
      //there is no action here, so no test to write
    });

    then('the App should display upcoming events from all cities', async () => {
      const AppDOM = AppComponent.container.firstChild;
      const EventListDOM = AppDOM.querySelector('#event-list');

      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      })
    });
  });

  test('User should see a list of suggestions when they search for a city', ({ given, when, then }) => {
    let AppComponent;
    given('the user wants to search for a city', () => {
      AppComponent = render(<App />);
    });

    let CitySearchDOM;
    when('the user searches for a city', async () => {
      const user = userEvent.setup();
      const AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      const citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });

    then('they should see a list of suggestions regarding that city', () => {
      const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2);
    });
  });

  test('User can select a city from the suggested list', ({ given, and, when, then }) => {
    let AppComponent;
    let AppDOM;
    let CitySearchDOM;
    let citySearchInput; 
    given('the user searches for a city', async () => {
      AppComponent = render(<App />);
      const user = userEvent.setup();
      AppDOM = AppComponent.container.firstChild;
      CitySearchDOM = AppDOM.querySelector('#city-search');
      citySearchInput = within(CitySearchDOM).queryByRole('textbox');
      await user.type(citySearchInput, "Berlin");
    });

    let suggestionListItems;
    and('the list of suggested cities is shown', () => {
      suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
      expect(suggestionListItems).toHaveLength(2);
    });

    when('the suggestions are displayed', () => {
      
    });

    then('the user should be able to select from that list of suggestions', async () => {
      const user = userEvent.setup();
      await user.click(suggestionListItems[0])
    });

    and(/^their city should be changed to that city \(i.e., "(.*)"\)$/, async (arg0) => { //why did this test end up so off in the description??
      expect(citySearchInput.value).toBe('Berlin, Germany');
      const EventListDOM = AppDOM.querySelector('#event-list');
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      const allEvents = await getEvents();

      //filtering the list of all events down to events located in Germany
      //citySearchInput.value should have the value of "Berlin, Germany" at this point
      const berlinEvents = allEvents.filter(event => event.location === citySearchInput.value);
      expect(EventListItems).toHaveLength(berlinEvents.length);
    });
  });
});