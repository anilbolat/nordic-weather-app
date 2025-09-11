import { WEATHER_API_BASE_URL } from '../../config.js';
import Card from '../location/Card.js'
import { useEffect, useState } from 'react';
import MyHeader from '../header/MyHeader';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import "react-datepicker/dist/react-datepicker.css";
import { useAuthContext } from '../../hooks/useAuthContext.js';

/*
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
*/

function MyLocation(props) {
    const [weatherDataList, setWeatherDataList] = useState([]);

    const { loginData } = useAuthContext();

    const [locationInput, setLocationInput] = useState("");
    const [dateInput, setDateInput] = useState("");
    const [tempMax, setTempMax] = useState("");
    const [tempMin, setTempMin] = useState("");
    const [conditions, setConditions] = useState("");

    /*
    useEffect(() => {
        dataLocations.forEach(({location, date}) => {
            handleFethingWeatherInfo(location, date);
        });
    }, []);
    */

    useEffect(() => {
        if (loginData) {
            fetchUserLocationsWeathersAsync();
        }
    }, []);

    const handleLocationInput = (event) => {
        event.preventDefault();
        setLocationInput(event.target.value);
    }

    // GET WEATHER

    const handleGetWeather = (event) => {
        event.preventDefault();
        fetchWeather(locationInput, dateInput);
    }

    const fetchWeather = (location, date) => {
        fetch(`${WEATHER_API_BASE_URL}/api/v1/weather?location=${encodeURIComponent(location)}&date=${encodeURIComponent(date)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setLocationInput(data.resolvedAddress);
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
                setLocationInput(data.resolvedAddress);
                setTempMax(convertFahrenheitToCelcius(data.days[0].tempmax) + "°");
                setTempMin(convertFahrenheitToCelcius(data.days[0].tempmin) + "°");
                setConditions(data.days[0].conditions);
            });
    }

    // GET USER LOCATIONS WEATHERS

    const fetchUserLocationsWeathersAsync = async () => {
        const req = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${loginData}` }
        };
        const response = await fetch(`${WEATHER_API_BASE_URL}/api/v1/user/locations/weather`, req);
        let data = await response.json();

        if (!response.ok) {
            console.log("getting locations is rejected: " + response);
        }

        if (response.ok) {
            console.log(data);
        }

        let weathers = [];
        for (let i=0; i < data.length; i++) {
            let weatherObj = JSON.parse(data[i].weather);
            const newWeather = {
                location: weatherObj.resolvedAddress,
                date: weatherObj.days[0].datetime,
                tempMax: convertFahrenheitToCelcius(weatherObj.days[0].tempmax),
                tempMin: convertFahrenheitToCelcius(weatherObj.days[0].tempmin),
                conditions: weatherObj.days[0].conditions
            };
            weathers = [...weathers, newWeather];
        }

        setWeatherDataList(weathers);
    }

    // SAVE USER LOCATION

    const handleSaveUserLocation = (event) => {
        event.preventDefault();
        saveUserLocation(locationInput, dateInput);
    }

    const saveUserLocation = (location, date) => {
        const req = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${loginData}` },
            body: JSON.stringify({ location: location, date: date })
        };

        fetch(`${WEATHER_API_BASE_URL}/api/v1/user/locations/weather`, req)
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
                setWeatherDataList(prevList => {
                    const newList = [...prevList, newWeatherData];
                    if (newList.length > 10) {
                        newList.shift();
                    }
                    return newList;
                });
            })
            .catch(error => {
                console.log("API error:", error);
            });
    }

    // DELETE USER LOCATION

    const handleDeleteUserLocation = (location, date) => {
        deleteUserLocationAsync(location, date);
    };

    const deleteUserLocationAsync = async (location ,date) => {
        const req = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${loginData}` }
        };
        const response = await fetch(`${WEATHER_API_BASE_URL}/api/v1/user/locations/weather?location${location}&date=${date}`, req);
        let data = await response.json();

        if (!response.ok) {
            console.log("deleting user locations is rejected: " + response);
        }

        if (response.ok) {
            console.log(data);
            setWeatherDataList((prevList) =>
            prevList.filter(
                (weather) => !(weather.location === location && weather.date === date)
            )
        );
        }
    }

    /*
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
    */

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
                        onClick={handleGetWeather}
                        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Get Weather
                    </button>
                </div>
                <div className="flex justify-center items-center mt-10">
                    <Card
                        location={locationInput}
                        date={dateInput}
                        tempMax={tempMax}
                        tempMin={tempMin}
                        conditions={conditions}
                    />
                    <button
                        onClick={handleSaveUserLocation}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                    >
                        Save
                    </button>
                </div>
                </div>
            </div>

            <div className="flex items-center gap-6 mt-10">
                {
                    weatherDataList.map((weather, index) => (
                        <div key={index} className="flex items-center gap-4">
                            <Card
                                key={index}
                                location={weather.location}
                                date={weather.date}
                                tempMax={weather.tempMax}
                                tempMin={weather.tempMin}
                                conditions={weather.conditions}
                            />
                            <button
                                onClick={() => handleDeleteUserLocation(weather.location, weather.date)}
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                            >
                                X
                            </button>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
);
}

export default MyLocation;