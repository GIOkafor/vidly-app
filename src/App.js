import React from 'react';
import './App.css';
import MoviesListComponent from './components/moviesListComponent';

function App() {
  return (
    <div className="container">
      <h1>Welcome to Vidly</h1>

      <MoviesListComponent />
    </div>
  );
}

export default App;
