import React from "react";
import FavoriteItem from "./FavoriteItem";

const Favorites = ({ yee, deleteFav, favorites }) => {
  return (
    <div>
      <div>
        {yee &&
          yee.map((item, index) => (
            <FavoriteItem
              key={index}
              item={item}
              deleteFav={deleteFav}
              favorites={favorites}
            />
          ))}
      </div>
    </div>
  );
};

export default Favorites;
