import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ShowListPage from './components/ShowListPage'
import ShowDetailPage from './components/ShowDetailPage'
import AboutPage from './components/AboutPage'
import Favorites from './components/Favorites'

function App() {


  return (
    <div>
      <h1>APP</h1>
      <br />
      <NavBar/>
      <Routes>
        <Route path="/" element={<ShowListPage/>} />
        <Route path="/shows/:id" element={<ShowDetailPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    
    </div>
  )
}

export default App
