import './css/app.css'
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Articles from './components/Articles';
import Article from './components/Article';
import UserProfile from './components/UserProfile';
import HomePage from './components/HomePage';

function App() {

  return (
    <>
    <header>
      <Header></Header>
      <Navbar></Navbar>
    </header>
    <main>
      <Routes>
        <Route path = '/' element={<HomePage />}/>
        <Route path = '/articles' element={<Articles />}/>
        <Route path = '/article/:article_id' element={<Article />}/>
        <Route path = '/user' element={<UserProfile />}/>
      </Routes>
    </main>
    </>
  )
}

export default App
