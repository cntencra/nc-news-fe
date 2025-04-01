import './App.css'
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Articles from './components/Articles';
import Article from './components/Article';

function App() {

  return (
    <>
    <header>
      <Header></Header>
      <Navbar></Navbar>
    </header>
    <main>
      <Routes>
        <Route path = '/'/>
        <Route path = '/article/:article_id' element={<Article />}/>
        <Route path = '/articles' element={<Articles />}/>
        <Route path = '/articles/:topic'/>
        <Route path = '/user'/>
      </Routes>
    </main>
    </>
  )
}

export default App
