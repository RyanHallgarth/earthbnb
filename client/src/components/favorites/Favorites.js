import React from "react";
import FavoriteItem from "./FavoriteItem";

const Favorites = ({ favorites, deleteFav, favIdArr }) => {
  return (
    <div>
      <div>
        {favorites.map((item, index) => (
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
