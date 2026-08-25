import { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { fetchShowById } from '../store/showsSlice';
import { Link, useParams } from 'react-router-dom';
import type { RootState, AppDispatch } from "../store/store"
import FavoriteButton from './FavoriteButton';
import { BackArrowIcon, StarIcon, AlertCircleIcon, TvIcon } from './icons';


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
    return (
      <div className="state-region">
        <div className="spinner"></div>
        <p className="state-loading-text">Loading show details…</p>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="state-region state-error">
        <div className="state-icon-circle"><AlertCircleIcon /></div>
        <p className="state-heading">Couldn't load this show</p>
        <p className="state-body">It may not exist, or something went wrong. Try again or head back to the list.</p>
        <div className="detail-actions" style={{ marginTop: '8px' }}>
          <button className="btn-primary">Retry</button>
          <Link to="/">Back to shows</Link>
        </div>
      </div>
    );
  }

  if (!show) {
    // Covers the brief initial render before the fetch's pending/fulfilled
    // status has landed, and a genuinely missing/invalid id.
    return (
      <div className="state-region">
        <p className="state-heading">No show found</p>
        <Link to="/">Back to shows</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/" className="back-link">
        <BackArrowIcon />
        Back to shows
      </Link>
      <div className="detail-layout">
        <div className="detail-poster">
          {show.image?.medium
            ? <img src={show.image.original} alt={show.name} />
            : <TvIcon />}
        </div>
        <div className="detail-info">
          <div className="detail-title">{show.name}</div>
          {(show.network?.name || show.webChannel?.name) && (
            <div className="detail-subtitle">Network: {show.network?.name ?? show.webChannel?.name}</div>
          )}
          <div className="detail-meta">
            {show.rating.average != null && (
              <div className="rating-badge">
                <StarIcon />
                {show.rating.average}
              </div>
            )}
            {show.genres.map((genre) => (
              <span className="pill" key={genre}>{genre}</span>
            ))}
          </div>
          {show.summary && (
            <p className="detail-synopsis">{show.summary.replace(/<[^>]*>/g, '')}</p>
          )}
          <div className="detail-extra">
            <span>Runtime: {show.runtime ?? 'Unknown'}</span>
            <span>Premiered: {show.premiered ?? 'Unknown'}</span>
            <span>Ended: {show.ended ?? 'Still running'}</span>
          </div>
          <div className="detail-actions">
            {show.officialSite && (
              <a href={show.officialSite} target="_blank" rel="noopener noreferrer" className="btn-secondary">Official Site</a>
            )}
            <FavoriteButton show={show}></FavoriteButton>
          </div>
        </div>
      </div>
    </div>
  )
}
