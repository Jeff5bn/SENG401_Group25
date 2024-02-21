import React, { useState } from 'react';
import './MovieCards.css';

const Duration = 300;

const movies = [
  { id: 1, name: "Movie 1", genre: "Action", imgUrl: "https://image.tmdb.org/t/p/original///7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg" },
  { id: 2, name: "Movie 2", genre: "Mystery", imgUrl: "https://image.tmdb.org/t/p/original///qhb1qOilapbapxWQn9jtRCMwXJF.jpg" },
  { id: 3, name: "Movie 3", genre: "Drama", imgUrl: "https://image.tmdb.org/t/p/original///9GBhzXMFjgcZ3FdR9w3bUMMTps5.jpg" },
  { id: 4, name: "Movie 4", genre: "Comedy", imgUrl: "https://image.tmdb.org/t/p/original///zVMyvNowgbsBAL6O6esWfRpAcOb.jpg" },
  { id: 5, name: "Movie 5", genre: "Sci-Fi", imgUrl: "https://image.tmdb.org/t/p/original///ldfCF9RhR40mppkzmftxapaHeTo.jpg" },
  { id: 6, name: "Movie 6", genre: "Horror", imgUrl: "https://image.tmdb.org/t/p/original///AcoVfiv1rrWOmAdpnAMnM56ki19.jpg" },
  { id: 7, name: "Movie 7", genre: "Romance", imgUrl: "https://image.tmdb.org/t/p/original///jojfbnIHGsRpodIood3OQoqA45Y.jpg" },
  { id: 8, name: "Movie 8", genre: "Thriller", imgUrl: "https://image.tmdb.org/t/p/original///zlT1Tc9hA1Ntye5hr7Gxos9U6U9.jpg" },
  { id: 9, name: "Movie 9", genre: "Fantasy", imgUrl: "https://image.tmdb.org/t/p/original///35Uef7fz9ctYbJLXbJBCqvtttEQ.jpg" },
  { id: 10, name: "Movie 10", genre: "Adventure", imgUrl: "https://image.tmdb.org/t/p/original///5jGKbYuZtdxSNOocI6ZziQeiY4n.jpg" },
  { id: 11, name: "Movie 11", genre: "Documentary", imgUrl: "https://image.tmdb.org/t/p/original///FgFoX4wlZUT31ErGGzVnNlh8U3.jpg" },
  { id: 12, name: "Movie 12", genre: "Action", imgUrl: "https://image.tmdb.org/t/p/original///7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg" },
];

function Movies() {
  const [swipeState, setSwipeState] = useState(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  
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
    // Code to handle like/skip/dislike
    setTimeout(() => {
      setCurrentIndex(currentIndex + 1);
      setSwipeDirection(null);
    }, Duration);
  };

  return (
    <div className="Movie">
      {swipeState === 0 ? (
        <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
          <div id="background">
            <img src={movies[currentIndex].imgUrl} alt={movies[currentIndex].name} />
            <h2>{movies[currentIndex].name}, {movies[currentIndex].genre}</h2>
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
              <img src={movies[currentIndex].imgUrl} alt={movies[currentIndex].name} />
              <h2>{movies[currentIndex].name}, {movies[currentIndex].genre}</h2>
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
              <img src={movies[currentIndex].imgUrl} alt={movies[currentIndex].name} />
              <h2>{movies[currentIndex].name}, {movies[currentIndex].genre}</h2>
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
          <h1>End of movie list!</h1>
          <button className="basic-button">See Recommendations</button>
        </div>
      )}
    </div>
  );
}

export default Movies;
