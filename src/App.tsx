import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ShowListPage from './components/ShowListPage'
import ShowDetailPage from './components/ShowDetailPage'
import AboutPage from './components/AboutPage'
import Favorites from './components/Favorites'
import { Provider } from 'react-redux'
import { store } from './store/store'
import PageNotFound from './components/PageNotFound'

function App() {


  return (
    <div>
      {/* Provider makes the Redux store available to every page via useSelector/useDispatch */}
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<ShowListPage />} />
          {/* :id is a route param — ShowDetailPage reads it with useParams() to fetch that one show */}
          <Route path="/shows/:id" element={<ShowDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/favorites" element={<Favorites />} />
          {/* Catches any path that didn't match a route above (must stay last) */}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
