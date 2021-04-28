import React from "react";
import "../../Favorite.css";
import { Button } from "@material-ui/core";

const FavoriteItem = ({ item, deleteFav }) => {
  const { id, name, thumbnail_url } = item.data[0];

  return (
    <div className='card grid-1'>
      <div className='fav-container'>
        <img src={thumbnail_url} alt='' />
        <h2>{name}</h2>
        <Button onClick={() => deleteFav(id)}>Delete</Button>
      </div>
    </div>
  );
};

export default FavoriteItem;
