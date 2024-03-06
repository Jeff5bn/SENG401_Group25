import React, { useState, useEffect } from 'react';
import './MovieCards.css';

// TODO: replace this with an API call
import jsonData from './temp_moviedata/temp_movie.json';

const Duration = 300;

function Movies() {
  const [movies, setMovies] = useState([]);
  const [swipeState, setSwipeState] = useState(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);

  // TODO: replace this with an API call
  useEffect(() => {
    const loadData = () => JSON.parse(JSON.stringify(jsonData));
    setMovies(loadData());
  }, []);

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    // Check if the initial 10 swipes have been completed
    if(currentIndex === 9){
      setSwipeState(1);
    }
    // Set the state if the index is out of bounds
    if(currentIndex + 1 >= movies.length){
      setSwipeState(3);
    }
    // TODO: add code to handle like/skip/dislike with backend
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
    }, Duration);
  };

  return movies.length !== 0 ? (
    <div className="Movie">
      {swipeState === 0 ? (
        <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
          <div id="background">
            <img src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`} alt={movies[currentIndex].title} />
            <h2>{movies[currentIndex].title}</h2>
            <div className="buttons">
              <button onClick={() => handleSwipe('dislike')}>❌</button>
              <button onClick={() => handleSwipe('skip')}>⛔</button>
              <button onClick={() => handleSwipe('like')}>❤️</button>
            </div>
          </div>
        </div>
      ) : swipeState === 1 ? (
        <div className="center-column-div">
          <div className="movie-card" style={{opacity: "0.2"}}>
          <div id="background">
            <img src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`} alt={movies[currentIndex].title} />
            <h2>{movies[currentIndex].title}</h2>
            </div>
          </div>
          <div className="rec-buttons">
            <button className="basic-button">See Recommendations</button>
            <button className="basic-button" onClick={() => setSwipeState(2)}>Continue Swiping</button>
          </div>
        </div>
      ) : swipeState === 2 ? (
        <div className="center-column-div">
          <button className="basic-button">See Recommendations</button>
          <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
            <div id="background">
              <img src={`https://image.tmdb.org/t/p/original${movies[currentIndex].poster_path}`} alt={movies[currentIndex].title} />
              <h2>{movies[currentIndex].title}</h2>
              <div className="buttons">
                <button onClick={() => handleSwipe('dislike')}>❌</button>
                <button onClick={() => handleSwipe('skip')}>⛔</button>
                <button onClick={() => handleSwipe('like')}>❤️</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="center-column-div">
          <h1 style={{color: "whitesmoke"}}>End of movie list!</h1>
          <h1 style={{color: "whitesmoke"}}>Check out your recommendations below:</h1>
          <button className="basic-button">See Recommendations</button>
        </div>
      )}
    </div>
  ) : (
    <div></div>
  );
}

export default Movies;
