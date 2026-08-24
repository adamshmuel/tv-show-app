import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { fetchShows, searchShowsByName } from '../store/showsSlice';

export default function ShowListPage() {

  const [searchPhrase, setSearchPhrase] = useState('');
  const shows = useSelector((state: RootState) => state.shows.showsList);
  const status = useSelector((state: RootState) => state.shows.showsFetchStatus.status)
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

  return (
    <div>ShowListPage
      <br />
      <input type="text" placeholder='Search shows by name...' value={searchPhrase} onChange={e => handleSearch(e.target.value)} />
      <ul style={{ textAlign: 'left' }}>
        {shows.map((show) => {
          return <li key={show.id}>
            {<img src={show.image?.medium} />} <br />
            {show.rating.average} <br />
            {show.genres} <br />
            {show.name} <br />
          </li>
        })}
      </ul>
    </div>
  )
}
