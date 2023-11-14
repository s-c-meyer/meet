import EventList from "../src/components/EventList";
import CitySearch from "../src/components/CitySearch";
import './App.css';
import NumberOfEvents from "./components/NumberOfEvents";


const App = function() {
  return (
    <div className="App">
      <CitySearch />
      <NumberOfEvents />
      <EventList />
    </div>
  )
}

export default App;
