# Nordic Weather App

A React-based web application for viewing weather information for various locations.

## Features

- User authentication (register, login, logout)
- View weather data for multiple locations
- Date selection for weather queries
- Protected routes for user-specific pages
- Responsive UI with cards and forms

## Technologies

- React
- React Router
- Context API & Reducer for state management
- Fetch API for backend communication
- date-fns & react-datepicker for date handling

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

```bash
npm install
```

### Running the App

```bash
npm start
```

The app will run at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
  components/
    header/
    location/
    login/
    logout/
    register/
  context/
  hooks/
  reducers/
  config.js
  App.js
  index.js
```

## Environment Variables

Set your weather API base URL in `.env`:

```js
REACT_APP_WEATHER_API_BASE_URL='YOUR_API_URL_HERE';
```
