import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { addFavorite, removeFavorite, type Show } from '../store/showsSlice'

export default function FavoriteButton({ show }: { show: Show }) {
  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = favorites.some(favorite => favorite.id === show.id);

  return isFavorite
    ? <button onClick={() => dispatch(removeFavorite(show))}>Remove from Favorites</button>
    : <button onClick={() => dispatch(addFavorite(show))}>Add to Favorites</button>;
}