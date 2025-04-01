import './App.css'
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Articles from './components/Articles';

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
        <Route path = '/article/:article_id'/>
        <Route path = '/articles' element={<Articles />}/>
        <Route path = '/articles/:topic'/>
        <Route path = '/user'/>
      </Routes>
    </main>
    </>
  )
}

export default App
