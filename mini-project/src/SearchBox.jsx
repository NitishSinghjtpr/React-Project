import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./SearchBox.css";
import { useState } from "react";

export default function SearchBox({updateInfo}) {
let API_URL = "https://api.openweathermap.org/data/2.5/weather";
let API_KEY = "00f33c023ec76aeca9a1a60d1a100aee";


let getWeatherInfo=async()=>{
  let response=  await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
  let jsonResponse=await response.json();
  console.log(jsonResponse);
 
    let result = {
      city: jsonResponse.name,
      temp: jsonResponse.main.temp,
      tempMin: jsonResponse.main.temp_min,
      tempMax: jsonResponse.main.temp_max,
      humidity: jsonResponse.main.humidity,
      feelsLike: jsonResponse.main.feels_like,
      weather: jsonResponse.weather[0].description,
    };
  console.log(result);
  return result;
  
}

  let [city, setCity] = useState("");

  let handleChange = (evt) => {
    setCity(evt.target.value);
  };
  let handleSubmit=async(evt)=>{
    evt.preventDefault();
    console.log(city);
    setCity("");
   let newInfo=await getWeatherInfo();
   console.log(newInfo);
   
     updateInfo(newInfo);
  };

  return (
    <div className="SearchBox">
      <h2>Search For The Weather</h2>
      <form onSubmit={handleSubmit}>
        <TextField id="city" label="City Name" variant="outlined" required onChange={handleChange} />
        <br />
        <br />
        <Button variant="contained" type="Submit" >
          Search{" "}
        </Button>
      </form>
    </div>
  );
}
