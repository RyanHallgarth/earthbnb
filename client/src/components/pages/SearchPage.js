import { React, useState } from "react";
import "../../SearchPage.css";
import Locations from "../locations/Locations";
import Pagination from "../layout/Pagination";
import Search from "../layout/Search";

const SearchPage = ({
  locations,
  filterSearch,
  loading,
  addFav,
  deleteFav,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  //Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = locations.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className='search-page'>
      <div className='card'>
        <Search filterSearch={filterSearch} />
      </div>
      <Locations
        locations={currentPosts}
        addFav={addFav}
        deleteFav={deleteFav}
        loading={loading}
      />
      {!loading && (
        <Pagination
          postsPerPage={postsPerPage}
          totalPosts={locations.length}
          paginate={paginate}
        />
      )}
    </div>
  );
};

export default SearchPage;
