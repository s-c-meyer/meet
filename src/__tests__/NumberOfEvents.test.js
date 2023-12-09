import { render, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";
import App from "../App";

describe('<NumberOfEvents /> Component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  })

  test('number of events contains an elemend with the role of textbox', () => {
    const numEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numEventsTextBox).toBeInTheDocument();
  });

  test('32 events are shown by default in the textbox', () => {
    const numEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numEventsTextBox).toHaveValue('32');
  });

  test('number of events value changes upon input', async () => {
    NumberOfEventsComponent.rerender(<NumberOfEvents setCurrentNOE={() => {}} setErrorAlert={() => {}} />)
    const numEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(numEventsTextBox, '{backspace}{backspace}10'); //simulates the user typing two backspaces and then 10 in the number of events input
    expect(numEventsTextBox).toHaveValue('10');
  })

});

describe('<NumberOfEvents /> Integration', () => {
  test('number of rendered events matches the number of events inputted by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NOEDOM = AppDOM.querySelector('#number-of-events');
    const NOEInput = within(NOEDOM).queryByRole('textbox');

    await user.type(NOEInput, '{backspace}{backspace}10'); //inputs two backspaces and types '10'

    const EventListDOM = AppDOM.querySelector('#event-list');
    await waitFor(() => {
      const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');
      expect(allRenderedEventItems.length).toBe(Number(NOEInput.value)); //using Number() here makes it so that .toBe is equal to 10 and not "10"
    });
  });
});