import { TvIcon, SearchIcon, HeartIcon, LayersIcon, GlobeIcon } from './icons';

export default function AboutPage() {
  return (
    <div>
      <div className="about-hero">
        <div className="about-hero-icon">
          <TvIcon size={28} />
        </div>
        <h1 className="about-title">TV Show Explorer</h1>
        <p className="about-lede">
          A browsing and search tool for TV shows, built with React,
          TypeScript, and Redux Toolkit. Show data is fetched live from{' '}
          <a
            href="https://www.tvmaze.com/api"
            target="_blank"
            rel="noopener noreferrer"
            className="about-source"
          >
            <GlobeIcon /> the TVMaze API
          </a>
          .
        </p>
      </div>

      <div className="about-features">
        <div className="about-feature">
          <div className="about-feature-icon">
            <SearchIcon />
          </div>
          <div className="about-feature-title">Search shows by name</div>
          <div className="about-feature-body">
            Type in the search bar on the home page to filter the list to
            matching shows, powered by TVMaze's own search endpoint.
          </div>
        </div>
        <div className="about-feature">
          <div className="about-feature-icon">
            <HeartIcon />
          </div>
          <div className="about-feature-title">Save favorites</div>
          <div className="about-feature-body">
            Mark any show as a favorite from its card or detail page.
            Favorites are saved in your browser, so they're still there
            next time you visit.
          </div>
        </div>
        <div className="about-feature">
          <div className="about-feature-icon">
            <LayersIcon />
          </div>
          <div className="about-feature-title">Built as a course project</div>
          <div className="about-feature-body">
            A capstone project demonstrating React components and hooks,
            Redux Toolkit thunks, and React Router — no backend, frontend
            only.
          </div>
        </div>
      </div>
    </div>
  )
}
