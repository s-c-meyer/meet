import EventList from "../src/components/EventList";
import CitySearch from "../src/components/CitySearch";
import NumberOfEvents from "./components/NumberOfEvents";
import { useEffect, useState } from "react";
import { getEvents, extractLocations } from "./api";
import { InfoAlert, ErrorAlert, WarningAlert } from "./components/Alert";

import './App.css';
import CityEventsChart from "./components/CityEventsChart";
import EventGenresChart from "./components/EventGenresChart";

const App = function() {
  const [events, setEvents] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [allLocations, setAllLocations] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  useEffect(() => { //populate the list as soon as the App Component is mounted
    if (navigator.onLine) {
      setWarningAlert("");
    } else {
      setWarningAlert("Warning: the displayed list of events has been loaded from the cache and may not be updated");
    }
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
      <div>
        <h1>Meyer's Meet App</h1>
      </div>
      <div className="alerts-container"> 
        {infoAlert.length ? <InfoAlert text={infoAlert}/> : null} {/*we will use the infoAlert state to pass text to InfoAlert*/}
        {errorAlert.length ? <ErrorAlert text={errorAlert}/> : null}
        {warningAlert.length ? <WarningAlert text={warningAlert}/> : null}
      </div>
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} setInfoAlert={setInfoAlert} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <div className="charts-container">
        <div className="pie-chart">
          <EventGenresChart events={events} />
        </div>
        
        <CityEventsChart allLocations={allLocations} events={events} />
      </div>
      <EventList events={events} />
    </div>
  )
}

export default App;
