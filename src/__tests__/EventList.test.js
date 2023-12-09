import { render, within, waitFor } from "@testing-library/react";
import { getEvents } from "../api";
import EventList from "../components/EventList";
import App from "../App";

describe('<EventList /> component', () => {
  let EventListComponent;
  beforeEach(() => {
    EventListComponent = render(<EventList />);
  });

  test('Has an element with "list" role', () => { //this test only tests if the EventList is rendered, not if there are events rendered within it
    expect(EventListComponent.queryByRole("list")).toBeInTheDocument();
  });

  test('renders correct number of events', async () => { //this test will only pass if EventList renders 4 events AND those events have the role listitem
    const allEvents = await getEvents();
    EventListComponent.rerender(<EventList events={allEvents} />); //this line uses 'mock data' or the empty events objects to test. There doesn't have to actually be any events, it will test with the empty objects
    expect(EventListComponent.getAllByRole("listitem")).toHaveLength(allEvents.length); //for this test, you could use any number, as long as it matches the mock data above
  });
});

describe('<EventList /> integration', () => {
  test('renders a list of 32 events when the app is mounted and rendered', async () => {
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const EventListItems = within(EventListDOM).queryAllByRole('listitem');
      expect(EventListItems.length).toBe(32);
    });
  });


});