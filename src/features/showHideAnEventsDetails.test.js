import { loadFeature, defineFeature } from "jest-cucumber";
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mockData from "../mock-data";
import Event from "../components/Event";


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  const mockEvent = mockData[0]
  test('An event is collapsed by default', ({ given, when, then }) => {
    let EventComponent;
    given('the user opens the app', () => {
      const AppComponent = render(<App />); //is this necessary?
    });

    when('they open the app and haven\'t clicked on anything', () => {
      EventComponent = render(<Event event={mockEvent} />)
    });

    then('the events should all be collapsed, not showing extra details', () => {
      expect(EventComponent.queryByText(mockEvent.description)).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    let AppComponent;
    given('the user opens the app and hasn\'t clicked on an event', () => {
      AppComponent = render(<App />);
    });

    let EventComponent;
    when(/^they click on "(.*)"$/, async (arg0) => {
      const user = userEvent.setup();
      EventComponent = render(<Event event={mockEvent} />);
      const showDetailsButton = EventComponent.container.querySelector('button[type="expand"]');
      await user.click(showDetailsButton);
    });

    then('the event element will expand to show details', () => {
      const hideDetailsButton = EventComponent.container.querySelector('button[type="hide"]');
      expect(hideDetailsButton).toBeInTheDocument();
      expect(EventComponent.container.querySelector('#description')).toBeInTheDocument();
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    let EventComponent;
    let user;
    given('an event element is expanded', async () => {
      user = userEvent.setup();
      EventComponent = render(<Event event={mockEvent} />);
      const showDetailsButton = EventComponent.container.querySelector('button[type="expand"]');
      await user.click(showDetailsButton);
      expect(EventComponent.container.querySelector('#description')).toBeInTheDocument();
    });

    when(/^the user clicks on "(.*)"$/, async (arg0) => {
      const hideDetailsButton = EventComponent.container.querySelector('button[type="hide"]');
      await user.click(hideDetailsButton);
    });

    then('the event element will collapse to hide the details', () => {
      expect(EventComponent.container.querySelector('#description')).not.toBeInTheDocument();
    });
  });
});