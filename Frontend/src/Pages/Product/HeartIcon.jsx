import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../Redux/features/favorites/faveroiteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utills/LocalStorage";
import { useEffect } from "react";
const HeartIcon = ({ product }) => {
  const dispatct = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorites = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatct(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorites) {
      dispatct(removeFromFavorites(product));

      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatct(addToFavorites(product));
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      onClick={toggleFavorites}
      className="absolute top-2 right-5 cursor-pointer"
    >
      {isFavorites ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-white" />
      )}
    </div>
  );
};

export default HeartIcon;
