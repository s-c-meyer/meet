import { useState } from "react";

const CitySearch = ({ allLocations }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [query, setQuery] = useState(""); //this query is a state for the input field, so you can access its value
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    const filteredLocations = allLocations ? allLocations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    }) : [];
  
    setQuery(value);
    setSuggestions(filteredLocations);
  };

  const handleItemClicked = (event) => {
    const value = event.target.textContent;
    setQuery(value);
    setShowSuggestions(false) //to hide the list
  }

  return (
    <div id="city-search">
      <input
        type="text"
        className="city"
          placeholder="Search for a new city"
        value={query}
        onFocus={() => setShowSuggestions(true)}
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
    </div>
  )
};

// const handleInputChange = (event) => {
//   const value = event.target.value;
//   const filteredLocations = allLocations ? allLocations.filter((location) => {
//     return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
//   }) : [];

//   setQuery(value);
//   setSuggestions(filteredLocations);
// }

export default CitySearch;