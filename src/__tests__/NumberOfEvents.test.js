import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import NumberOfEvents from "../components/NumberOfEvents";

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
    const numEventsTextBox = NumberOfEventsComponent.queryByRole('textbox');
    const user = userEvent.setup();
    await user.type(numEventsTextBox, '{backspace}{backspace}10'); //simulates the user typing two backspaces and then 10 in the number of events input
    expect(numEventsTextBox).toHaveValue('10');
  })

})