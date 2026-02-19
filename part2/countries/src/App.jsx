import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Form from "./components/Form";

const base_url = "https://studies.cs.helsinki.fi/restcountries/api";
const allCountries = [];

const App = () => {
  const [countryList, setCountryList] = useState([]);

  useEffect(() => {
    axios.get(`${base_url}/all`).then((response) => {
      response.data.forEach((country) => {
        allCountries.push(country.name.common);
      });
      console.log("Loaded Countries Data");
    });
  }, []);

  const handleFilterChange = (event) => {
    if (allCountries.length === 0) {
      console.log("Countries Data hasn't loaded yet.");
      return;
    }

    const filter = event.target.value.toLowerCase();
    console.log("Filter", filter);

    if (filter === "") {
      setCountryList([]);
    } else {
      setCountryList(
        allCountries.filter((name) => name.toLowerCase().includes(filter)),
      );
    }
  };

  return (
    <div>
      <form>
        <Form text={"find countries"} handleChange={handleFilterChange} />
        <Countries countryList={countryList} />
      </form>
    </div>
  );
};

export default App;
