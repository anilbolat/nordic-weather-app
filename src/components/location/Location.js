import { WEATHER_API_BASE_URL } from "../../config.js";
import MyHeader from '../header/MyHeader';
import Card from './Card.js';
import { Weather } from './Weather.js';
import { useState } from "react";
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";


function Location(props) {
    const [location, setLocation] = useState(Weather.location);
    const [locationInput, setLocationInput] = useState("");
    const [date, setDate] = useState("");
    const [tempMax, setTempMax] = useState(Weather.tempMax);
    const [tempMin, setTempMin] = useState(Weather.tempMin);
    const [conditions, setConditions] = useState(Weather.conditions);


    const handleLocationInput = (event) => {
        event.preventDefault();
        setLocationInput(event.target.value);
    }

    const handleFethingWeatherInfo = () => {
        fetch(`${WEATHER_API_BASE_URL}/api/v1/weather?location=${encodeURIComponent(locationInput)}&date=${encodeURIComponent(date)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLocation(data.resolvedAddress);
                setTempMax(convertFahrenheitToCelcius(data.days[0].tempmax) + "°");
                setTempMin(convertFahrenheitToCelcius(data.days[0].tempmin) + "°");
                setConditions(data.days[0].conditions);
            })
            .catch(error => {
                console.log(error);
                let data = {
                    "resolvedAddress": "vuores",
                    "days" : [
                        {
                            "tempmax": 84.3,
                            "tempmin": 64.7,
                            "conditions": "Sunny"
                        }
                    ]
                };
                setLocation(data.resolvedAddress);
                setTempMax(convertFahrenheitToCelcius(data.days[0].tempmax) + "°");
                setTempMin(convertFahrenheitToCelcius(data.days[0].tempmin) + "°");
                setConditions(data.days[0].conditions);
            });
    }

    const convertFahrenheitToCelcius = (fahrenheit) => {
        return Math.round((fahrenheit - 32) * 5 / 9);
    }

    return (
    <div>
        <MyHeader />
        <div className="max-w-3xl mx-auto mt-10 px-4">
            <div className="bg-white rounded-xl shadow-md p-6">
                <div className="bg-blue-600 text-white text-center rounded-md py-4 mb-6">
                    <h2 className="text-2xl font-semibold">Weather App</h2>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="dateInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Date
                        </label>
                        <DatePicker
                        id="dateInput"
                        selected={date}
                        onChange={(newDate) => setDate(format(newDate, 'yyyy-MM-dd'))}
                        dateFormat="yyyy-MM-dd"
                        placeholderText="Pick a date"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                <div>
                    <label htmlFor="locationInput" className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <input
                        type="text"
                        id="locationInput"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Type your location here ..."
                        value={locationInput}
                        onChange={handleLocationInput}
                    />
                </div>

                <div className="text-center mt-4">
                    <button
                        onClick={handleFethingWeatherInfo}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Get Weather
                    </button>
                </div>
                </div>
            </div>

            <div className="flex justify-center items-center mt-10">
                <Card
                    city={location}
                    date={date}
                    tempHigh={tempMax}
                    tempLow={tempMin}
                    description={conditions}
                />
            </div>
        </div>
    </div>
);

}

export default Location;