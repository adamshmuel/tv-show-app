import { useEffect} from 'react'
import { useSelector, useDispatch} from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';
import { loadFavorites } from '../store/showsSlice';
import { StarIcon } from './icons';

export default function Favorites() {

  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();

  // Loads favorites from localStorage on mount — needed here too (not just
  // ShowListPage) in case a user lands directly on /favorites, e.g. via a
  // refresh or bookmark, without ShowListPage ever having mounted first.
  useEffect(() => {
    dispatch(loadFavorites());
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="info-page">
        <p className="state-heading">No favorites yet</p>
        <p className="state-body">Shows you favorite will show up here.</p>
        <Link to="/">Browse shows</Link>
      </div>
    )
  }

  return (
    <div className="show-grid">
      {favorites.map((favorite) => {
        return <div className="card" key={favorite.id}>
          <Link to={`/shows/${favorite.id}`} className="card-poster">
            <img src={favorite.image?.original} alt={favorite.name} />
          </Link>
          <div className="card-body">
            <Link to={`/shows/${favorite.id}`} className="card-title">{favorite.name}</Link>
            <div className="card-pills">
              {favorite.genres.map((genre) => (
                <span className="pill" key={genre}>{genre}</span>
              ))}
            </div>
            {favorite.rating.average != null && (
              <div className="rating-badge">
                <StarIcon />
                {favorite.rating.average}
              </div>
            )}
            <FavoriteButton show={favorite}></FavoriteButton>
          </div>
        </div>
      })}
    </div>
  )
}
