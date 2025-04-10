import './App.css';
import { About } from './components/About/About';
import { Header } from './components/Header/Header';
import { Home } from './components/Home/Home';
import { Swapi } from './components/Swapi/Swapi';
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="swapi" element={<Swapi />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
