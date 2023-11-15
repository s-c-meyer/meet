const NumberOfEvents = ({ setCurrentNOE }) => {
  const handleNOEChange = (event) => {
    const value = event.target.value; //.value or .textContent?
    setCurrentNOE(value);
  }

  return(
    <div id='number-of-events'>
      <input 
        role='textbox'
        defaultValue={32}
        onChange={handleNOEChange}
      />
    </div>
  )
}

export default NumberOfEvents;