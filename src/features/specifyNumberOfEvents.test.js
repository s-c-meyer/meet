import { render, waitFor, within } from "@testing-library/react";
import { defineFeature, loadFeature } from "jest-cucumber";
import App from "../App";
import userEvent from "@testing-library/user-event";

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn\'t specified a number, 32 events are shown by default', ({ given, when, then }) => {
    given('the user hasn\'t specified a number of events', () => {
      //no action, so no test necessary
    });

    let EventListDOM;
    when('the user opens the app', () => {
      const AppComponent = render(<App />);
      const AppDOM = AppComponent.container.firstChild;
      EventListDOM = AppDOM.querySelector('#event-list');
    });

    then(/^the app will display (\d+) events by default$/, async (arg0) => {
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(32);
      })
    });
  });

  test('User can change the number of events displayed', ({ given, when, then }) => {
    let AppComponent;
    let AppDOM;
    let NOEDOM;
    let NOEInput;
    given('the user wants to change the amount of events shown', () => {
      AppComponent = render(<App />);
      AppDOM = AppComponent.container.firstChild;
      NOEDOM = AppDOM.querySelector('#number-of-events');
      NOEInput = within(NOEDOM).queryByRole('textbox');
    });

    when('the user selects a number of events to display', async () => {
      const user = userEvent.setup();
      await user.type(NOEInput, '{backspace}{backspace}10');
    });

    then('the app will display that many events, instead of the default', async () => {
      const EventListDOM = AppDOM.querySelector('#event-list');
      await waitFor(() => {
        const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
        expect(allRenderedEventItems.length).toBe(Number(NOEInput.value));
      });
    });
  });
});