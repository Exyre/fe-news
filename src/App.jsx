import { useState, useEffect } from 'react'
import ArticleList from './components/ArticleList'
import './App.css'


function App() {
  return (
    <div className='App'>
      <h1>My News App</h1>
      <ArticleList />
    </div>
  );
}

export default App;
