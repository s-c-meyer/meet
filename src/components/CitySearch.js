import { useState, useEffect } from "react";
import OutsideClickHandler from "react-outside-click-handler";

const CitySearch = ({ allLocations, setCurrentCity, setInfoAlert }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState(""); //this query is a state for the input field, so you can access its value
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    setSuggestions(allLocations);
  }, [`${allLocations}`]); //using the ${} to stringify allLocations ensures that useEffect will go off of the string value of allLocations, and not their memory references. 

  const handleInputChange = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
  
    setQuery(value);
    setSuggestions(filteredLocations);

    //set InfoAlert text if necessary
    let infoText;
    if (filteredLocations.length === 0) { //if there are no suggestions to show to the user
      infoText = "We cannot find the city you are looking for. Please try another city"
    } else {
      infoText = ""
    }
    setInfoAlert(infoText);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false) //to hide the list
    setCurrentCity(value);
    setInfoAlert(""); //this is so that if a user clicks See all cities, the alert will disappear. Otherwise, it would not disappear
  }

  return (
    <div id="city-search">
      <OutsideClickHandler
        display="contents"
        onOutsideClick={() => {
          setShowSuggestions(false);
        }}
      >
      <input
        type="text"
        className="city"
          placeholder="Search for a new city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
        //this makes it so that you cannot click on the list, which is not good
        //also, only allows you to click out of the list, not to hit escape to get out. 
        // onBlur={() => setShowSuggestions(false)}
        onChange={handleInputChange}
      />
      {showSuggestions ?
        <ul className="suggestions">
          {suggestions.map((suggestion) => {
            return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
          })}
          <li onClick={handleItemClicked} key="See all cities">
            <b>See all cities</b>
          </li>
        </ul>
        : null
      }
      </OutsideClickHandler>

      {/* <OutsideClick>
        {showSuggestions ?
          <ul className="suggestions">
            {suggestions.map((suggestion) => {
              return <li onClick={handleItemClicked} key={suggestion}>{suggestion}</li>
            })}
            <li onClick={handleItemClicked} key="See all cities">
              <b>See all cities</b>
            </li>
          </ul>
          : null
        }
      </OutsideClick> */}
    </div>
  )
};

export default CitySearch;