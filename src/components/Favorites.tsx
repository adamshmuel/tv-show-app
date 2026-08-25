import { useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';
import { loadFavorites } from '../store/showsSlice';

export default function Favorites() {

  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();

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
