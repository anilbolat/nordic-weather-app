import { WEATHER_API_BASE_URL } from '../../config.js';
import Card from '../location/Card.js'
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import MyHeader from '../header/MyHeader';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";

const dataLocations = [
    {
        "location": "Vuores",
        "date": "2025-08-14"
    },
    {
        "location": "Porto",
        "date": "2025-08-14"
    },
    {
        "location": "Sardegna",
        "date": "2025-08-14"
    },
    {
        "location": "Palermo",
        "date": "2025-08-14"
    },
    {
        "location": "Izmir",
        "date": "2025-08-14"
    }
];


function MyLocation(props) {
    const [weatherDataList, setWeatherDataList] = useState([]);

    const location = useLocation();
    const email = location.state?.email;

    const [locationInput, setLocationInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [formData, setFormData] = useState({ "email": "", "password": "" });

    useEffect(() => {
        /*dataLocations.forEach(({location, date}) => {
            handleFethingWeatherInfo(location, date);
        });*/
        fetchLocations(email);
    }, []);

    const handleLocationInput = (event) => {
        event.preventDefault();
        setLocationInput(event.target.value);
    }

    const handleInputChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleFetchingLocations = (event) => {
        event.preventDefault();
        handleFethingWeatherInfo(locationInput, dateInput);
    }

    const fetchLocations = async (email) => {
        const response = await fetch(`${WEATHER_API_BASE_URL}/api/v1/weather/locations?email=${encodeURIComponent(email)}`);
        let data = await response.json();

        if (!response.ok) {
            console.log("getting locations is rejected: " + response);
        }

        if (response.ok) {
            console.log(data);
        }

        for (let i = 0; i < data.length; i++) {
            handleFethingWeatherInfo(data[i].location, data[i].date);
        }
    }

    const handleFethingWeatherInfo = (location, date) => {
        fetch(`${WEATHER_API_BASE_URL}/api/v1/weather?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                const newWeatherData = {
                    location: data.resolvedAddress,
                    date: date,
                    tempMax: convertFahrenheitToCelcius(data.days[0].tempmax),
                    tempMin: convertFahrenheitToCelcius(data.days[0].tempmin),
                    conditions: data.days[0].conditions
                };
                setWeatherDataList(prevList => [...prevList, newWeatherData]);

            })
            .catch(error => {
                console.log("API error:", error);
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
                        selected={dateInput}
                        onChange={(newDateInput) => setDateInput(format(newDateInput, 'yyyy-MM-dd'))}
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
                        onClick={handleFetchingLocations}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Get Weather
                    </button>
                </div>
                </div>
            </div>

            <div className="flex flex-col items-center gap-6 mt-10">
                {
                    weatherDataList.map((weather, index) => (
                        <Card
                            key={index}
                            location={weather.location}
                            date={weather.date}
                            tempMax={weather.tempMax}
                            tempMin={weather.tempMin}
                            conditions={weather.conditions}
                        />
                    ))
                }
            </div>
        </div>
    </div>
);
}

export default MyLocation;