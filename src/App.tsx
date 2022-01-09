import { useCallback, useState } from 'react'
import './App.css'
import useFetchTopMangas from './services/requests/useFetchTopMangas'
import { useFavoriteMangas } from './store/useFavoriteMangas'

function App() {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const { data } = useFetchTopMangas()
  const { favorites, favoritateManga } = useFavoriteMangas()

  const toggleShowOnlyFavorites = useCallback(() => {
    setShowOnlyFavorites((prevShowOnlyFavorites) => !prevShowOnlyFavorites)
  }, [])

  return (
    <div className='App'>
      <button onClick={toggleShowOnlyFavorites}>Show Favorites</button>
      {data?.top
        .filter(
          (manga) => !showOnlyFavorites || favorites?.includes(manga.mal_id)
        )
        .map((manga) => (
          <div className='Test' key={`Manga-${manga.mal_id}`}>
            <img src={manga.image_url} />
            {manga.title}
            <button onClick={() => favoritateManga(manga.mal_id)}>
              {favorites?.includes(manga.mal_id) ? '*' : ' '} Favoritar
            </button>
          </div>
        ))}
    </div>
  )
}

export default App
