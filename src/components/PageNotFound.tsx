import { Link } from 'react-router-dom'

export default function PageNotFound() {
  return (
    <div className="info-page">
      <p className="state-heading">Page not found</p>
      <Link to="/">Back to home</Link>
    </div>
  )
}
