import { useState } from "react";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleShowDetailsClicked = () => {
    setShowDetails(true);
    return (
      <li>
        <h4>{event.summary}</h4>
        <p>{event.created}</p>
        <p>{event.location}</p>
        <p id="description">{event.description}</p>
        <button className="detail" type="condense" onClick={handleHideDetailsClicked} >Hide Details</button>
      </li>
    )
  };

  const handleHideDetailsClicked = () => {
    setShowDetails(false);
    return (
      <li>
        <h4>{event.summary}</h4>
        <p>{event.created}</p>
        <p>{event.location}</p>
        <button className="detail" type="expand" onClick={handleShowDetailsClicked} >Show Details</button>
      </li>
    )
  };

  if(!showDetails) {
    return(
      <li>
      <h4>{event.summary}</h4>
      <p>{event.created}</p>
      <p>{event.location}</p>
      <button className="detail" type="expand" onClick={handleShowDetailsClicked} >Show Details</button>
    </li>
    )
  } else{
    return (
      <li>
        <h4>{event.summary}</h4>
        <p>{event.created}</p>
        <p>{event.location}</p>
        <p id="description">{event.description}</p>
        <button className="detail" type="hide" onClick={handleHideDetailsClicked} >Hide Details</button>
      </li>
    );
  };
};

export default Event;

// mock data 
// {
//   "kind": "calendar#event",
//   "etag": "\"3181161784712000\"",
//   "id": "4eahs9ghkhrvkld72hogu9ph3e_20200519T140000Z",
//   "status": "confirmed",
//   "htmlLink": "https://www.google.com/calendar/event?eid=NGVhaHM5Z2hraHJ2a2xkNzJob2d1OXBoM2VfMjAyMDA1MTlUMTQwMDAwWiBmdWxsc3RhY2t3ZWJkZXZAY2FyZWVyZm91bmRyeS5jb20",
//   "created": "2020-05-19T19:17:46.000Z",
//   "updated": "2020-05-27T12:01:32.356Z",
//   "summary": "Learn JavaScript",
//   "description": "Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these. :) \n\nJavascript offers interactivity to a dull, static website. Come, learn JavaScript with us and make those beautiful websites.",
//   "location": "London, UK",
//   "creator": {
//    "email": "fullstackwebdev@careerfoundry.com",
//    "self": true
//   },
//   "organizer": {
//    "email": "fullstackwebdev@careerfoundry.com",
//    "self": true
//   },
//   "start": {
//    "dateTime": "2020-05-19T16:00:00+02:00",
//    "timeZone": "Europe/Berlin"
//   },
//   "end": {
//    "dateTime": "2020-05-19T17:00:00+02:00",
//    "timeZone": "Europe/Berlin"
//   },
//   "recurringEventId": "4eahs9ghkhrvkld72hogu9ph3e",
//   "originalStartTime": {
//    "dateTime": "2020-05-19T16:00:00+02:00",
//    "timeZone": "Europe/Berlin"
//   },
//   "iCalUID": "4eahs9ghkhrvkld72hogu9ph3e@google.com",
//   "sequence": 0,
//   "reminders": {
//    "useDefault": true
//   },
//   "eventType": "default"
//  },