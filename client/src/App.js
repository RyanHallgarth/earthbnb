import { Fragment, useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import About from "./components/pages/About";
import Locations from "./components/locations/Locations";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);

  // const listLocations = async () => {
  //   console.log("yee");
  //   const res = await axios.get(
  //     "v1/listings?page=1&limit=10&sort_by=title&order=asc"
  //   );
  // };

  useEffect(() => {
    console.log("yee");
    const res = axios
      .get("v1/listings?page=1&limit=10&sort_by=title&order=asc")
      .then((res) => setLocations(res.data.content));
  }, []);

  return (
    <Router>
      <Fragment>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/about' component={About} />
          </Switch>
          <Locations locations={locations} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
