import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { fetchShows, searchShowsByName, loadFavorites } from '../store/showsSlice';
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';
import { SearchIcon, StarIcon, AlertCircleIcon } from './icons';

export default function ShowListPage() {

  const [searchPhrase, setSearchPhrase] = useState('');
  const shows = useSelector((state: RootState) => state.shows.showsList);
  const status = useSelector((state: RootState) => state.shows.showsFetchStatus.status)
  const dispatch = useDispatch<AppDispatch>();

  // Rehydrate favorites from localStorage so FavoriteButton knows what's
  // already favorited, even right after a page refresh.
  useEffect(() => {
    dispatch(loadFavorites());
  }, []);


  // Empty deps array — only fetch the default list once, on mount
  useEffect(() => {
    dispatch(fetchShows());
  }, [])

  const handleSearch = (name: string) => {
    if (name) {
      dispatch(searchShowsByName(name));
    } else {
      // Clearing the search box restores the default list instead of
      // searching for an empty string (which would hit the API pointlessly)
      dispatch(fetchShows());
    }

    setSearchPhrase(name);

  }


  return (
    <div>
      <div className="search-row">
        <div className="search-wrap">
          <span className="search-icon"><SearchIcon /></span>
          <input
            className="search-input"
            type="text"
            placeholder="Search shows by name…"
            value={searchPhrase}
            onChange={e => handleSearch(e.target.value)}
          />
        </div>
      </div>
      {/* Loading/error/grid are rendered conditionally rather than as early
          returns, so the <input> above stays mounted and never loses focus
          while typing a search (each keystroke briefly sets status:'loading') */}
      {status === "loading" && (
        <div className="state-region">
          <div className="spinner"></div>
          <p className="state-loading-text">Loading shows…</p>
        </div>
      )}
      {status === "failed" && (
        <div className="state-region state-error">
          <div className="state-icon-circle"><AlertCircleIcon /></div>
          <p className="state-heading">Couldn't load shows</p>
          <p className="state-body">Please check your connection and try again.</p>
          <button className="btn-primary" style={{ marginTop: '8px' }}>Retry</button>
        </div>
      )}
      {status !== "loading" && status !== "failed" && (
        <div className="show-grid">
          {shows.map((show) => {
            return <div className="card" key={show.id}>
              <Link to={`/shows/${show.id}`} className="card-poster">
                <img src={show.image?.original} alt={show.name} />
              </Link>
              <div className="card-body">
                <Link to={`/shows/${show.id}`} className="card-title">{show.name}</Link>
                <div className="card-pills">
                  {show.genres.map((genre) => (
                    <span className="pill" key={genre}>{genre}</span>
                  ))}
                </div>
                <div className="card-rating-slot">
                  {show.rating.average != null && (
                    <div className="rating-badge">
                      <StarIcon />
                      {show.rating.average}
                    </div>
                  )}
                </div>
                <FavoriteButton show={show}></FavoriteButton>
              </div>
            </div>
          })}
        </div>
      )}
    </div>
  )
}
