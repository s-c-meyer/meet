import EventList from "../src/components/EventList";
import CitySearch from "../src/components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert } from "./components/Alert";

import './App.css';

const App = function() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");

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
      <div className="alerts-container"> 
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null} {/*we will use the infoAlert state to pass text to InfoAlert*/}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <EventList events={events} />
    </div>
  )
}

export default App;
