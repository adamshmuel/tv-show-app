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
      <h1>Tv Shows App</h1>
      <br />
      <Provider store={store}>
        <NavBar />
        <Routes>
          <Route path="/" element={<ShowListPage />} />
          <Route path="/shows/:id" element={<ShowDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </Provider>
    </div>
  )
}

export default App
