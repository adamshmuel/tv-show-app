import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchShowById } from '../store/showsSlice';
import { Link, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from "../store/store"
import FavoriteButton from './FavoriteButton';


export default function ShowDetailPage() {


  // id comes from the /shows/:id route segment
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const show = useSelector((state: RootState) => state.shows.show);
  const status = useSelector((state: RootState) => state.shows.showFetchStatus.status)

  useEffect(() => {
    if (!id) return;
    dispatch(fetchShowById(id));
    // Depends on id so navigating from one show's page directly to another
    // (id changes but the component stays mounted) re-fetches the new show.
  }, [id])

  if (status === "loading") {
    return <p>Loading....</p>;
  }

  if (status === "failed") {
    return <p>Error can not fetch show</p>;
  }

  if (!show) {
    // Covers the brief initial render before the fetch's pending/fulfilled
    // status has landed, and a genuinely missing/invalid id.
    return <p>No show found</p>
  }

  return (
    <div>
      <img src={show.image?.medium} />  <br />
      rating: {show.rating.average} <br />
      genres: {show.genres} <br />
      runtime: {show.runtime} <br />
      premiered: {show.premiered} <br />
      ended: {show.ended} <br />
      name: {show.name}  <br />
      <a href={show.officialSite ?? undefined} target="_blank" rel="noopener noreferrer">Official Site</a><br />
      <FavoriteButton show={show}></FavoriteButton>
      <br />
      <Link to="/">Back to home page</Link>
    </div>
  )
}
