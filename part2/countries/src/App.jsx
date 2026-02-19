import { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Form from "./components/Form";

const base_url = "https://studies.cs.helsinki.fi/restcountries/api";
const allCountries = [];

const App = () => {
  const [countryList, setCountryList] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get(`${base_url}/all`).then((response) => {
      response.data.forEach((country) => {
        allCountries.push(country.name.common);
      });
      console.log("Loaded Countries Data");
    });
  }, []);

  const updateCountryList = (event) => {
    if (allCountries.length === 0) {
      console.log("Countries Data hasn't loaded yet.");
      return;
    }

    const newFilter = event.target.value.toLowerCase();
    setFilter(newFilter);
    console.log("Filter", newFilter);

    if (newFilter === "") {
      setCountryList([]);
    } else {
      setCountryList(
        allCountries.filter((name) => name.toLowerCase().includes(newFilter)),
      );
    }
  };

  return (
    <div>
      <Form
        text={"find countries"}
        filter={filter}
        handleChange={updateCountryList}
      />
      <Countries countryList={countryList} handleShow={updateCountryList} />
    </div>
  );
};

export default App;
