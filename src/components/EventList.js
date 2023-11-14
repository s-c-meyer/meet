import Event from "./Event";

const EventList = ({ events }) => {
  return (
    <ul id="event-list">
      {events? events.map(event => <Event key={event.id} event={event} />) : null} 
      {/*by using 'events?' combined with ': null', it ensures the '.map()' loop is only executed if 'events' is defined. W/o this, the test fails b/c is it unsure if App will pass an events prop */}
    </ul> //ul is assigned the 'list' role automatically, so it passes the first test in EventList.test.js
  );
}

export default EventList;