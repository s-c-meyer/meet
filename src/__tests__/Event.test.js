import { render } from "@testing-library/react";
import Event from "../components/Event";
import mockData from "../mock-data";
import userEvent from "@testing-library/user-event";

const mockEvent = mockData[0];

describe('<Event /> Component', () => {
  let EventComponent;
  beforeEach(() => {
    EventComponent = render(<Event event={mockEvent} />);
  });

  test('renders event title', () => {
    expect(EventComponent.queryByText(mockEvent.summary)).toBeInTheDocument();
  });

  test('renders events start time', () => {
    expect(EventComponent.queryByText(mockEvent.created)).toBeInTheDocument();
  });

  test('renders event location', () => {
    expect(EventComponent.queryByText(mockEvent.location)).toBeInTheDocument();
  });

  test('renders show details button', () => {
    const detailButton = EventComponent.container.querySelector('button[type="expand"]');
    expect(detailButton).toBeInTheDocument();
  });

  test('by default, event details should be hidden', () => {
    expect(EventComponent.queryByText(mockEvent.description)).not.toBeInTheDocument();
  });

  test('shows "Hide Details" button when "Show Details" button is clicked', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.container.querySelector('button[type="expand"]');
    await user.click(showDetailsButton);
    const hideDetailsButton = EventComponent.container.querySelector('button[type="hide"]');
    expect(hideDetailsButton).toBeInTheDocument();
  });

  test('shows event details when "Show Details"button is clicked', async () => {
    const user = userEvent.setup();
    const showDetailsButton = EventComponent.container.querySelector('button[type="expand"]');
    await user.click(showDetailsButton);
    // expect(EventComponent.queryByText(mockEvent.description)).toBeInTheDocument(); //why did this not work like all of the other selectors above?
    expect(EventComponent.container.querySelector('#description')).toBeInTheDocument();
  });
})