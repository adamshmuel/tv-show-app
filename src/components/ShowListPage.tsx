import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from "../store/store"
import { fetchShows } from '../store/showsSlice';

export default function ShowListPage() {

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

  return (
    <div>ShowListPage
      <br />
      <input type="text" placeholder='Search shows by name...' />
      <ul style={{ textAlign: 'left' }}>
        {shows.map((show) => {
          return <li key={show.id}>
            {<img src={show.image?.medium}/>} <br />
            {show.rating.average} <br />
            {show.genres} <br />
            {show.name} <br />
          </li>
        })}
      </ul>
    </div>
  )
}
