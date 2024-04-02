import { useEffect, useState } from "react";
import axios from 'axios';

const Weather = () => {

    const [data, setData] = useState ({ //we define the default values that we will have once we open the application
        celcius: 10,
        name: 'Athens',
        humidity: 10,
        wind: 2,
        image: "/images/clouds.png"
    })

    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleInputName = (event) => {
        setName(event.target.value); //we get the input value from the user
    }

    const handleClick = () => {
        if (name !== "") {
            const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid={YOUR_API_KEY}&units=metric`; //define the API Url
            axios.get(apiURL)
            .then(result => {

                let imagePath = ''; //define the default imagePath which is blank
                if(result.data.weather[0].main == "Clouds") {
                    imagePath = "/images/clouds.png"
                } else if(result.data.weather[0].main == "Clear"){
                    imagePath = "/images/sunny.png"
                } else if(result.data.weather[0].main == "Rain"){
                    imagePath = "/images/rain.png"
                } else if(result.data.weather[0].main == "Drizzle"){
                    imagePath = "/images/drizzle.png"
                } else if(result.data.weather[0].main == "Mist"){
                    imagePath = "/images/mist.png"
                } else {
                    imagePath = "/images/clouds.png" //default image path
                }

                setData({...data, //destructure the data object that we received from the API
                    celcius: result.data.main.temp,
                    name: result.data.name, 
                    humidity: result.data.main.humidity, 
                    wind: result.data.wind.speed,
                    image: imagePath})
                setError("") //clear the error message when user provides right city name
            })
            .catch(error => {
                if(error.response.status == 404) { //if error message is 404 display the proper message
                    setError("Wrong city name!")
                } else {
                    setError("")
                }
            });
        }
    }

    return(
        <div className="container">
            <div className="weather">
                <div className="search">
                    <input type="text" placeholder="Enter City" onChange={handleInputName}/>
                    <button onClick={handleClick}><img src="/images/search_icon.png" alt="Search Button" /></button>
                </div>
                <div className="error">
                    <p>{error}</p>
                </div>
                <div className="winfo">
                    <img src={data.image} alt="clouds" />
                    <h1>{Math.round(data.celcius)}°C</h1>
                    <h2>{data.name}</h2>
                    <div className="details">
                        <div className="col">
                            <img src="/images/humidity.png" alt="humidity" />
                            <div className="humidity">
                                <p>{Math.round(data.humidity)}%</p>
                                <p>Humidity</p>
                            </div>
                        </div>
                        <div className="col">
                            <img src="/images/wind.png" alt="wind" />
                            <div className="wind">
                                <p>{Math.round(data.wind)} km/h</p>
                                <p>Wind</p>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Weather;