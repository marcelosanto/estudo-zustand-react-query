import './App.css'
import useFetchTopMangas from './services/requests/useFetchTopMangas'

function App() {
  const { data } = useFetchTopMangas()

  return (
    <div className='App'>
      {data?.top.map((manga) => (
        <div className='Test' key={`Manga-${manga.mal_id}`}>
          <img src={manga.image_url} />
          {manga.title}
        </div>
      ))}
    </div>
  )
}

export default App
