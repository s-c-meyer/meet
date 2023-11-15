import EventList from "../src/components/EventList";
import CitySearch from "../src/components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";

import './App.css';

const App = function() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  useEffect(() => { //populate the list as soon as the App Component is mounted
    fetchData();
  }, [currentCity, currentNOE]); //setting currentCity as a dependency ensures that fetchData is called whenever there is a change in the currentCity state

  const fetchData = async () => {
    const allEvents = await getEvents();
    const filteredEvents = currentCity === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === currentCity)
    setEvents(filteredEvents.slice(0, currentNOE));
    setAllLocations(extractLocations(allEvents));
  } 

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} />
      <EventList events={events} />
    </div>
  )
}

export default App;
