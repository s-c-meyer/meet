const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  const handleNOEChange = (event) => {
    const value = event.target.value; //.value or .textContent?
    let infoText;
    if (isNaN(value) || value <=0) {
      infoText = "This is an invalid number. It either contains text, or is a negative number. Please try again.";
    } else {
      infoText="";
      setCurrentNOE(value);
    }
    setErrorAlert(infoText);
  };

  return(
    <div id='number-of-events'>
      <p>Number of Events</p>
      <input 
        defaultValue={32}
        onChange={handleNOEChange}
      />
    </div>
  )
}

export default NumberOfEvents;