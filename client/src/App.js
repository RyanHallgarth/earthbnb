import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Location from "./components/locations/Location";
import SearchPage from "./components/pages/SearchPage";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);

  const searchLocations = async (text) => {
    console.log("click");
    const res = await axios.get("api/v1/listings?page=3&limit=30");
    setLocations(res.data.content);
  };

  const highestRated = async () => {
    const res = await axios.get("/api/v1/listings/toprated?limit=10");
    setLocations(res.data);
  };

  const uniqueStays = async () => {
    const res = await axios.get("/api/v1/listings/uniquestays?limit=10");
    setLocations(res.data);
  };

  const entirePlace = async () => {
    const res = await axios.get(
      "/api/v1/listings/entireplace?limit=10&accomodates=10"
    );
    setLocations(res.data);
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
          <Home
            searchLocations={searchLocations}
            highestRated={highestRated}
            uniqueStays={uniqueStays}
            entirePlace={entirePlace}
          />
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
