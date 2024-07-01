import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {
    let [countries,setContries]=useState([]);
  useEffect(() => {
    
    let fetch = async () => {
      let {data} =await axios.get("https://restcountries.com/v3.1/all");
        
        setContries(data);
        data.map((val,ind)=>{
            val.map((val,ind)=>{
               console.log(val);
            })
        })
      
    
    };
    fetch();
  
      
  
      
    
  },[]);

  return (
    <form action="">
      Enter country name:
      <select>
        {countries.map((val,ind)=>{
            // return (<option key={ind} value={val.name}>{val.name}</option>)
        })}
      </select>
    </form>
  );
};

export default App;
