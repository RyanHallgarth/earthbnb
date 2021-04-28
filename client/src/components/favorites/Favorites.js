import React from "react";
import FavoriteItem from "./FavoriteItem";

const Favorites = ({ yee, deleteFav }) => {
  return (
    <div>
      <div>
        {yee.map((item, index) => (
          <FavoriteItem key={index} item={item} deleteFav={deleteFav} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
