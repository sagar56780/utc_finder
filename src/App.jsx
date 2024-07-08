import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";

const App = () => {
  let [countries, setContries] = useState([]);
  let [selectedIndex, setIndex] = useState(-1);
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
  let handleClick = (e) => {
    e.preventDefault();
    settimezones(countries[e.target.value].timezones);
    setIndex(e.target.value);
    console.log(timezones);
  };

  return (
    <form action="" className="container">
      Enter country name:
      <select id="country" className="form-select" onChange={handleClick}>
        {countries.map((val, ind) => {
          return (
            <option value={ind} key={ind}>
              {val.name.common}
            </option>
          );
        })}
      </select>
      {timezones.map((val, ind) => {
        return (
          <>
            <h1 key={ind}>{val}</h1>
          </>
        );
      })}
      <br />
      <h1 className="mb-4">{selectedIndex>=0?countries[selectedIndex].capital:null}</h1>
      <h1>{selectedIndex>0?countries[selectedIndex].region:null}</h1>
       <img src={selectedIndex>0?countries[selectedIndex].flags.png:null} alt="" />
    </form>
  );
};

export default App;
