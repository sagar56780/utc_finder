import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";

// Import your custom CSS file for additional styling

const App = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const { data } = await axios.get("https://restcountries.com/v3.1/all");
        // Sorting countries by name
        data.sort((a, b) => a.name.common.localeCompare(b.name.common));
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleClick = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setTimezones(countries[selectedOption.value]?.timezones || []);
  };

  // Mapping countries to options for Select component
  const options = countries.map((country, index) => ({
    value: index,
    label: country.name.common,
  }));

  return (
    <form className="container mt-5 p-4 border rounded shadow-lg bg-light animate__animated animate__fadeIn">
      <h1 className="mb-4 text-center text-primary">Search your country:</h1>
      <Select
        id="country"
        onChange={handleClick}
        className="form-select mb-4"
        options={options}
        value={selectedCountry}
        placeholder="Select a country"
        isSearchable
      />
      {selectedCountry && (
        <div className="container mt-4 p-4 border rounded shadow-sm bg-white animate__animated animate__fadeInUp">
          <h1 className="mb-3 text-secondary">
            {countries[selectedCountry.value]?.name.common}
          </h1>
          <div className="row">
            <div className="col-md-6">
              <p>
                <strong>Capital:</strong>{" "}
                {countries[selectedCountry.value]?.capital}
              </p>
              <p>
                <strong>Region:</strong>{" "}
                {countries[selectedCountry.value]?.region}
              </p>
              <h3>Timezones:</h3>
              <ul>
                {timezones.map((val, ind) => (
                  <li key={ind}>{val}</li>
                ))}
              </ul>
            </div>
            <div className="col-md-6 text-center">
              <img
                src={countries[selectedCountry.value]?.flags.png}
                alt="Country flag"
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
        </div>
      )}
    </form>
  );
};

export default App;
