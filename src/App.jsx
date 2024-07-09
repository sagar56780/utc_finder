import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const App = () => {
  let [countries, setContries] = useState([]);
  let [currentCountry, setCurrentCountry] = useState(null);
  let [selectedCountry, setSelectedCountry] = useState(null);
  let [timezones, settimezones] = useState([""]);
  useEffect(() => {
    let fetch = async () => {
      let { data } = await axios.get("https://restcountries.com/v3.1/all");

      data.sort((a, b) => {
        const nameA = a.name.common.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.common.toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        // names must be equal
        return 0;
      });
      setContries(data);
    };
    fetch();
  }, []);
  let handleClick = (selectedOption) => {
    setSelectedCountry(selectedOption);

    settimezones(countries[selectedCountry.value].timezones);
  };
  const options = countries.map((country, index) => ({
    value: index,
    label: country.name.common,
  }));

  return (
    <form action="" className="container">
      Enter country name:
      <Select
        id="country"
        onChange={handleClick}
        className="form-select"
        options={options}
        value={selectedCountry}
        placeholder="Select a country"
        isSearchable
      >
        {countries.map((val, ind) => {
          return (
            <option value={ind} key={ind}>
              {val.name.common}
            </option>
          );
        })}
      </Select>
      {selectedCountry && (
        <div className="container">
          <p>{selectedCountry.index}</p>
          <h1>{countries[selectedCountry.value].name.common}</h1>
          {timezones.map((val, ind) => {
            return (
              <>
                <h1>{val}</h1>x
              </>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default App;
