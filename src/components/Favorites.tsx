import { useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';
import { loadFavorites } from '../store/showsSlice';

export default function Favorites() {

  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();

  // Loads favorites from localStorage on mount — needed here too (not just
  // ShowListPage) in case a user lands directly on /favorites, e.g. via a
  // refresh or bookmark, without ShowListPage ever having mounted first.
  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }} >
      {favorites.map((favorite) => {
        return <div key={favorite.id}>
          <Link to={`/shows/${favorite.id}`}><img src={favorite.image?.medium} /></Link><br />
          {favorite.rating.average} <br />
          {favorite.genres} <br />
          <Link to={`/shows/${favorite.id}`}>{favorite.name} <br /></Link>
          <FavoriteButton show={favorite}></FavoriteButton>
        </div>
      })}
    </div>
  )
}
