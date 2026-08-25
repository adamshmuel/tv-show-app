import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { fetchShows, searchShowsByName, loadFavorites } from '../store/showsSlice';
import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton';

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
      <input style={{ marginBottom: '24px', width: '420px', height: '30px', padding: '10px 14px', fontSize: '16px' }} type="text" placeholder='Search shows by name...' value={searchPhrase} onChange={e => handleSearch(e.target.value)} />
      {/* Loading/error/grid are rendered conditionally rather than as early
          returns, so the <input> above stays mounted and never loses focus
          while typing a search (each keystroke briefly sets status:'loading') */}
      {status === "loading" && <p>Loading....</p>}
      {status === "failed" && <p>Error can not fetch show</p>}
      {status !== "loading" && status !== "failed" && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
          {shows.map((show) => {
            return <div key={show.id}>
              <Link to={`/shows/${show.id}`}><img src={show.image?.medium} /></Link><br />
              {show.rating.average} <br />
              {show.genres} <br />
              <Link to={`/shows/${show.id}`}>{show.name} <br /></Link>
              <FavoriteButton show={show}></FavoriteButton>
            </div>
          })}
        </div>
      )}
    </div>
  )
}
