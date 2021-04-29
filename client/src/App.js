import { React, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Location from "./components/locations/Location";
import SearchPage from "./components/pages/SearchPage";
import Profile from "./components/pages/Profile";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [favIdArr, setFavIdArr] = useState([]);
  const [checkFavs, setCheckFavs] = useState(false);

  useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);

  const filterSearch = async (
    minGuests,
    minBaths,
    minBedrooms,
    minBeds,
    priceRange
  ) => {
    setLoading(true);
    const res = await axios.get(
      `api/v1/listings?page=3&limit=30&min_guests=${minGuests}&min_bathrooms=${minBaths}&min_bedrooms=${minBedrooms}&min_beds=${minBeds}&price[gte]=${priceRange[0]}&price[lte]=${priceRange[1]}`
    );

    console.log(
      `api/v1/listings?page=3&limit=30&min_guests=${minGuests}&min_bathrooms=${minBaths}&min_bedrooms=${minBedrooms}&min_beds=${minBeds}&'price[gte]'=${priceRange[0]}&'price[lte]'=${priceRange[1]}`
    );
    setLocations(res.data.content);
    setLoading(false);
  };

  const searchLocations = async () => {
    setLoading(true);
    const res = await axios.get(`api/v1/listings?page=3&limit=30`);
    console.log("clicky");
    setLocations(res.data.content);
    setLoading(false);
    console.log(locations);
  };

  const highestRated = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/listings/toprated?limit=10");
    setLocations(res.data);
    setLoading(false);
  };

  const uniqueStays = async () => {
    setLoading(true);
    const res = await axios.get("/api/v1/listings/uniquestays?limit=10");
    setLocations(res.data);
    setLoading(false);
  };

  const entirePlace = async () => {
    setLoading(true);
    const res = await axios.get(
      "/api/v1/listings/entireplace?limit=10&accomodates=10"
    );
    setLocations(res.data);
    setLoading(false);
  };

  const getLocation = async (id) => {
    setLoading(true);
    const res = await axios.get(`/api/v1/listings/listing/${id}`);
    setLocation(res.data[0]);
    setLoading(false);
  };

  const logOut = async () => {
    const res = await axios.get(`/api/auth/logout`);
    setCurrentUser({});
    console.log("Log Out!");
  };

  const getUser = async () => {
    console.log("getUser call");
    const res = await axios.get(`/api/auth/user`);
    setCurrentUser(res.data);
    setFavIdArr(res.data.favorites);
  };

  const addFav = async (id) => {
    const res = await axios.post(`api/v1/favorite/${id}`);
    console.log(`api/v1/favorite/${id}`);
  };

  const deleteFav = async (id) => {
    await axios
      .delete(`/api/v1/favorite/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });

    setFavorites(favorites.filter((favorite) => favorite.data[0].id !== id));
  };

  const displayFav = () => {
    if (favIdArr) {
      const res = favIdArr.map((favorite) =>
        axios.get(`/api/v1/listings/listing/${favorite}`)
      );

      axios.all(res).then(function (result) {
        setFavorites(result);
      });
    }
  };

  const checked = async (id) => {
    const res = await axios.get(`/api/v1/favorite/${id}`).catch((err) => {
      console.log(err);
      console.log(err.response);
    });
  };

  return (
    <Router>
      <Header currentUser={currentUser} logOut={logOut} />

      <Switch>
        <Route exact path='/'>
          <Home
            searchLocations={searchLocations}
            filterSearch={filterSearch}
            highestRated={highestRated}
            uniqueStays={uniqueStays}
            entirePlace={entirePlace}
          />
        </Route>

        <Route exact path='/search'>
          <SearchPage
            locations={locations}
            filterSearch={filterSearch}
            loading={loading}
            addFav={addFav}
            deleteFav={deleteFav}
            currentUser={currentUser}
            checked={checked}
          />
        </Route>

        <Route
          exact
          path='/profile/:email'
          render={(props) => (
            <Profile
              {...props}
              currentUser={currentUser}
              getUser={getUser}
              deleteFav={deleteFav}
              displayFav={displayFav}
              favorites={favorites}
              favIdArr={favIdArr}
            />
          )}
        />

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
