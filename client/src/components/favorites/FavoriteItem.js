import React from "react";
import "../../Favorite.css";
import { Button, Link } from "@material-ui/core";

const FavoriteItem = ({ item, deleteFav }) => {
  const { id, name, thumbnail_url } = item.data[0];

  return (
    <div className='card grid-1'>
      <div className='fav-container'>
        {thumbnail_url ? (
          <img src={thumbnail_url} alt='' />
        ) : (
          <img src='https://i.stack.imgur.com/y9DpT.jpg' alt='' />
        )}
        <h2>{name}</h2>
        <Button onClick={() => deleteFav(id)}>Delete</Button>
      </div>
    </div>
  );
};

export default FavoriteItem;
