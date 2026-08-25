# TV Show Explorer

A React + TypeScript app for browsing and searching TV shows, built as a
capstone/final project for a fullstack course. Frontend only — no
backend or database — consuming the free [TVMaze API](https://www.tvmaze.com/api).

## Features

- Browse a grid of TV shows fetched from TVMaze on load.
- Search shows by name (live, as-you-type).
- Click a show to view its detail page (nested route).
- Mark/unmark shows as favorites, persisted across page refreshes.
- Dedicated Favorites page listing only favorited shows.
- Loading, error, and not-found states throughout.

## Tech stack

- **React 19 + TypeScript**, built with **Vite**.
- **Redux Toolkit** — one slice (`showsSlice`) holding show list, single
  show, favorites, and their fetch-status state.
- **React Router** — top-level routes plus a nested `/shows/:id` detail
  route and a catch-all 404.
- **Axios** for HTTP requests to the TVMaze API.

## Skills demonstrated

This project was built to demonstrate everything covered in the course
so far, in one coherent app:

- **React components + hooks** — function components throughout, `useState`
  for the controlled search input, `useEffect` for data fetching on
  mount and on route-param change, custom event handlers.
- **Controlled forms** — the search input in `ShowListPage` is a fully
  controlled `<input>` driven by component state.
- **React Router** — top-level routes (`/`, `/about`, `/favorites`), a
  nested dynamic route (`/shows/:id`) read via `useParams`, `<Link>`
  navigation, and a catch-all `*` route for unmatched paths.
- **Redux Toolkit** — a slice combining synchronous reducers (favorites
  add/remove/load) with `createAsyncThunk` for all data fetching,
  `extraReducers` handling `pending`/`fulfilled`/`rejected` for three
  separate thunks (`fetchShows`, `searchShowsByName`, `fetchShowById`).
- **REST consumption via Axios** — including handling a real API's
  response-shape inconsistency (TVMaze's search endpoint wraps each
  result as `{ score, show }` instead of returning shows directly, which
  the thunk unwraps before it reaches the store).
- **TypeScript** — full typing of the API response shape (`Show` and its
  nested interfaces), typed Redux (`RootState`, `AppDispatch`,
  `PayloadAction`), and typed thunks (`createAsyncThunk<ReturnType,
  ArgType, ...>`).
- **Loading/error state handling** — every async operation tracks its own
  `status`/`errorMessage`, rendered as distinct UI states rather than
  just a happy path.
- **Component composition & reuse** — a shared `FavoriteButton` component
  used identically from both the list grid and the detail page, instead
  of duplicating the add/remove-favorite logic in each.
- **Browser persistence** — favorites are synced to `localStorage` on
  every add/remove, and reloaded into Redux state on mount so they
  survive a page refresh.

## Setup

```bash
npm install
npm run dev
```
