import { React, useState } from "react";
import "../../SearchPage.css";
import Locations from "../locations/Locations";
import Pagination from "../layout/Pagination";

const SearchPage = ({ locations }) => {
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
      <Locations locations={currentPosts} />
      <Pagination
        postsPerPage={postsPerPage}
        totalPosts={locations.length}
        paginate={paginate}
      />
    </div>
  );
};

export default SearchPage;
