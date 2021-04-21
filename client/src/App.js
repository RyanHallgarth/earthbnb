import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Location from "./components/locations/Location";
import SearchPage from "./components/pages/SearchPage";
import axios from "axios";
import Map from "./components/Map";

function App() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);

  const searchLocations = async (text) => {
    const res = await axios.get("api/v1/listings?page=1&limit=10");

    setLocations(res.data.content);
    console.log(locations);
  };

  const getLocation = async (id) => {
    const res = await axios.get(`/api/v1/listings/listing/${id}`);
    setLocation(res.data[0]);
  };

  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path='/'>
          <Home searchLocations={searchLocations} />
        </Route>

        <Route exact path='/search'>
          <SearchPage locations={locations} />
        </Route>

        <Route
          exact
          path='/location/:id'
          render={(props) => (
            <Location
              {...props}
              location={location}
              getLocation={getLocation}
            />
          )}
        />
      </Switch>
    </Router>
  );
}

export default App;
