import { useState } from "react";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";


function Location(props) {
    let key = "YNYQLGJH3WDXKH2TR8N226T2X";
    const [location, setLocation] = useState("");
    const [locationInput, setLocationInput] = useState("");
    const [date, setDate] = useState("");
    const [temperature, setTemperature] = useState("- °C");


    const handleLocationInput = (event) => {
        event.preventDefault();
        setLocationInput(event.target.value);
        setTemperature("- °C");
    }

    const handleFethingWeatherInfo = () => {
        fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(locationInput)}/${date}?key=${key}`)
            //fetch(`/api/v1/weather?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLocation(data.resolvedAddress);
                setTemperature(convertFahrenheitToCelcius(data.days[0].temp) + " °C ");
            })
            .catch(error => {
                console.log(error);
            });
    }

    const convertFahrenheitToCelcius = (fahrenheit) => {
        return Math.round((fahrenheit - 32) * 5 / 9);
    }

    return (
        <div className="container mt-5">
            <div className="row"></div>
            <div className="col-md-8 offset-md-2">
                <div className="card text-center shadow">
                    <div className="card-header bg-primary text-white">
                        <h2>Weather App</h2>
                    </div>
                    <div className="card-body">
                        <h4 className="card-title">{location}</h4>
                        <p className="card-text">
                            Temperature: {temperature}
                        </p>
                    </div>

                    <div>
                        <label htmlFor="dateInput" className="form-label">Date: </label>
                        <DatePicker
                            className="form-control"
                            id="dateInput"
                            selected={date}
                            onChange={(newDate) => setDate(format(newDate, 'yyyy-MM-dd'))}
                            dateFormat={"yyyy-MM-dd"}
                            placeholderText="Pick a date"
                        />
                    </div>

                    <label htmlFor="locationInput" className="form-label">Location: </label>
                    <input
                        type="text"
                        id="locationInput"
                        className="form-control"
                        placeholder="Type your location here ..."
                        value={locationInput}
                        onChange={handleLocationInput}
                    />

                    <div className="card-footer mb-auto">
                        <button className="btn btn-primary" onClick={handleFethingWeatherInfo}>Click for weather</button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Location;