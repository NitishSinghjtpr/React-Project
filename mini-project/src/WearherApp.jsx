import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){
    const [weatherInfo,setWeatherInfo]=useState({
         city:"Delhi",
        feelsLike: 24.84,
        temp: 25.05,
        tempMin: 25.05,
        tempMax: 25.05,
        humidity: 47,
        Weather: "haze"
    });

     let updateInfo=(newInfo)=>{
        setWeatherInfo(newInfo);
    }
    return(
        <div style={{textAline:"center"}}>
        
        <SearchBox updateInfo={updateInfo}/>
        <br />
        <InfoBox info={weatherInfo}/>
        </div>
    )
}