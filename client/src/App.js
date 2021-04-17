import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Pagination from "./components/layout/Pagination";
import Home from "./components/pages/Home";
import Header from "./components/layout/Header";
import Locations from "./components/locations/Locations";
import Location from "./components/locations/Location";
import axios from "axios";

function App() {
  const [locations, setLocations] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const searchLocations = async (text) => {
    const res = await axios
      .get("local/api/v1/listings?page=1&limit=5")
      .catch(function (error) {
        console.error(error);
      });

    //setLocations(res.data.content);
    console.log(res);
  };

  //Get number of locations

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = locations.slice(indexOfFirstPost, indexOfLastPost);

  //Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <Router>
      <Fragment>
        <Header />
        <Home searchLocations={searchLocations} />
        <div className='container'>
          <Switch>
            <Route exact path='/'>
              <Fragment>
                <Locations locations={currentPosts} />
                <Pagination
                  postsPerPage={postsPerPage}
                  totalPosts={locations.length}
                  paginate={paginate}
                />
              </Fragment>
            </Route>
            <Route
              exact
              path='/location/:id'
              render={(props) => <Location {...props} />}
            />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
