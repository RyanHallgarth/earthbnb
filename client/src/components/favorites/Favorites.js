import React from "react";
import FavoriteItem from "./FavoriteItem";

const Favorites = ({ yee, deleteFav, favIdArr }) => {
  return (
    <div>
      <div>
        {yee.map((item, index) => (
          <FavoriteItem
            key={index}
            item={item}
            deleteFav={deleteFav}
            favIdArr={favIdArr}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
