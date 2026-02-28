import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SideBar from './components/SideBar';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Body from './components/Body';
import News from './components/News';
import Post from './components/Posts';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

function App() {

  return (
    <>
      <TopNavBar/>
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Body />} />
            <Route path="/news" element={<News />} />
            <Route path="/timeline" element={<News />} />
            <Route path="/post" element={<Post/>} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
