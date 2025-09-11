import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Chapters from './pages/Chapters'
import ChapterDetail from './pages/ChapterDetail'
import VerseDetail from './pages/VerseDetail'
import About from './pages/About'

function App() {
  return (
    <Routes>
      {/* All routes are nested inside the Layout component.
        This means every page will share the same Header and theme logic.
      */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="chapters" element={<Chapters />} />
        <Route path="chapter/:id" element={<ChapterDetail />} />
        <Route path="verse/:chapterId/:verseId" element={<VerseDetail />} />
        <Route path="about" element={<About />} />
        {/* Optional: Add a 404 page */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
    </Routes>
  )
}

export default App