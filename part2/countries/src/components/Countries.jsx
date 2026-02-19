import { useState } from "react";
import axios from "axios";

const base_url = "https://studies.cs.helsinki.fi/restcountries/api";

const Countries = ({ countryList, handleShow }) => {
  const [countryData, setCountryData] = useState(null);

  if (countryList.length > 10) {
    console.log(
      `Too many matches (${countryList.length}), specify another filter`,
    );
    return <div>{"Too many matches, specify another filter"}</div>;
  } else if (countryList.length > 1) {
    console.log("Displaying Country List");
    return (
      <div>
        <ul>
          {countryList.map((name) => (
            <li key={name}>
              {name}{" "}
              <button onClick={handleShow} value={name}>
                Show
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (countryList.length === 0) {
    console.log("Country List is Empty");
    return null;
  }

  if (countryData === null || countryList[0] !== countryData.name.common) {
    console.log("Downloading data for", countryList[0]);
    axios.get(`${base_url}/name/${countryList[0]}`).then((response) => {
      setCountryData(response.data);
    });
  } else {
    console.log("Showing", countryList[0]);
    return (
      <div>
        <h1>{countryData.name.common}</h1>
        {"Capital " + countryData.capital}
        <br></br>
        {"Area " + countryData.area}
        <h1>{"Languages"}</h1>
        <ul>
          {Object.values(countryData.languages).map((language) => (
            <li key={language}>{language}</li>
          ))}
        </ul>
        <img src={countryData.flags.svg} height="200" />
      </div>
    );
  }
};

export default Countries;
