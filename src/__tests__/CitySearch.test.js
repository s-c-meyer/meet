import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { extractLocations, getEvents } from "../api";
import CitySearch from "../components/CitySearch";
import App from "../App";

describe('<CitySearch /> component', () => {
  let CitySearchComponent;
  beforeEach(() => {
    CitySearchComponent = render(<CitySearch allLocations={[]} />); //dummy prop of allLocations={[]} was added to CitySearch
  });

  test('renders text input', () => {
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });

  test('suggestions list is hidden by default', () => {
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });

  test('updates list of suggestions correctly when user types in city textbox', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    //user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    //filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    //get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(suggestions.length + 1); //the plus one is because there is a 'see all cities' option as well
    for (let i=0; i < suggestions.length; i += 1) {
      expect(suggestionListItems[i].textContent).toBe(suggestions[i]);
    }
  });

  //additional test to test when a city that is not available is typed into the search box, such as Paris, France
  test('updates list of suggestions correctly when user types in city textbox, when the city is not present in the list', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} />);

    //user types "Berlin" in city textbox
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Paris");

    //filter allLocations to locations matching "Berlin"
    const suggestions = allLocations? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(cityTextBox.value.toUpperCase()) > -1;
    }) : [];

    //get all <li> elements inside the suggestion list
    const suggestionListItems = CitySearchComponent.queryAllByRole('listitem');
    expect(suggestionListItems).toHaveLength(1); //should only have length of 1 because the city doesn't exist in the calendar and "See all cities" is still displayed
  });

  test('renders the suggestions text in the textbox upon clicking on the suggestion', async () => {
    const user = userEvent.setup();
    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);
    CitySearchComponent.rerender(<CitySearch allLocations={allLocations} setCurrentCity={() => { }} />); //passing a dummy prop for setCurrentCity is needed here because this test has no access to the App Component, so it has no idea that setCurrentCity is a function that exists

    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.type(cityTextBox, "Berlin");

    //the suggestions textContent looks like this: "Berlin, Germany"
    const BerlinGermanySuggestion = CitySearchComponent.queryAllByRole('listitem')[0];
    await user.click(BerlinGermanySuggestion);
    expect(cityTextBox).toHaveValue(BerlinGermanySuggestion.textContent);
  });
});

describe('<CitySearch /> integration', () => {
  test('renders suggestions list when the app is rendered.', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const cityTextBox = within(CitySearchDOM).queryByRole('textbox');
    await user.click(cityTextBox); 

    const allEvents = await getEvents();
    const allLocations = extractLocations(allEvents);

    //we do not HAVE to use waitFor here, because it is not necessary when we are relying on a user event above, in this case user.click. 
    const suggestionListItems = within(CitySearchDOM).queryAllByRole('listitem');
    expect(suggestionListItems.length).toBe(allLocations.length + 1);
  });
});