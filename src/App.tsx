import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import SideBar from './components/SideBar';
import TopNavBar from './components/TopNavBar';
import Footer from './components/Footer';
import Body from './components/Body';
import News from './components/News';
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
            <Route path="/News" element={<News />} />
            <Route path="/Timeline" element={<News />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer/>
    </>
  )
}

export default App;
