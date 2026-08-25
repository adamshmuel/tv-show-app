import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { fetchShows, searchShowsByName, addFavorite, type Show , removeFavorite} from '../store/showsSlice';
import { Link } from 'react-router-dom'

export default function ShowListPage() {

  const [searchPhrase, setSearchPhrase] = useState('');
  const shows = useSelector((state: RootState) => state.shows.showsList);
  const status = useSelector((state: RootState) => state.shows.showsFetchStatus.status)
  const favorites = useSelector((state: RootState) => state.shows.favorites);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    dispatch(fetchShows());
  }, [])

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  if (status === "failed") {
    return <p>Error can not fetch post <button>Retry</button></p>;
  }

  const handleSearch = (name: string) => {
    if (name) {
      dispatch(searchShowsByName(name));
    } else {
      dispatch(fetchShows());
    }

    setSearchPhrase(name);

  }

  const handleAddToFavorites = (show: Show) => {
    dispatch(addFavorite(show));
  }

  const handleRemoveFromFavorites = (show: Show) => {
    dispatch(removeFavorite(show));
  }
  

  return (
    <div>
      <input style={{ marginBottom: '24px', width: '420px', height: '30px', padding: '10px 14px', fontSize: '16px' }} type="text" placeholder='Search shows by name...' value={searchPhrase} onChange={e => handleSearch(e.target.value)} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: '24px' }}>
        {shows.map((show) => {
          return <div key={show.id}>
            <Link to={`/shows/${show.id}`}><img src={show.image?.medium} /></Link><br />
            {show.rating.average} <br />
            {show.genres} <br />
            <Link to={`/shows/${show.id}`}>{show.name} <br /></Link>
            {favorites.find(favorite => favorite.id === show.id) ?
              <button onClick={() => handleRemoveFromFavorites(show)}>Remove from Favorites</button> :
              <button onClick={() => handleAddToFavorites(show)}>Add to Favorites</button>
            }
          </div>
        })}
      </div>
    </div>
  )
}
