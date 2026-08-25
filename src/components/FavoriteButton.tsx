import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { addFavorite, removeFavorite, type Show } from '../store/showsSlice'

// Shared by ShowListPage, ShowDetailPage, and Favorites so the add/remove
// toggle logic only has to live in one place instead of being duplicated
// in every page that shows a favorite-able show.
export default function FavoriteButton({ show }: { show: Show }) {
  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();
  const isFavorite = favorites.some(favorite => favorite.id === show.id);

  return isFavorite
    ? <button className="btn-secondary is-favorite" onClick={() => dispatch(removeFavorite(show))}>Remove from Favorites</button>
    : <button className="btn-secondary" onClick={() => dispatch(addFavorite(show))}>Add to Favorites</button>;
}