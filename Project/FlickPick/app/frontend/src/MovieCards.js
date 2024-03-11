import React, { useState,useEffect } from 'react';
import './MovieCards.css';

const Duration = 300;

function Movies({ handleRecommendationsClick }) {
  const [swipeState, setSwipeState] = useState(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieid,setMovieid] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/popular-movies", { method: "GET" })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data)
        // Transform poster paths to full image URLs
        const moviesWithFullImgUrl = data.map(movie => ({
          ...movie,
          imgUrl: `https://image.tmdb.org/t/p/original//${movie.poster_path}`
        }));
        setMovies(moviesWithFullImgUrl); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  useEffect(() => {
    if (movieid !== null && swipeDirection === 'like') {
      likeMovie();
    }
    else if(movieid !== null && swipeDirection === 'dislike') {
    dislikeMovie();
      }
  }, [movieid, swipeDirection]);

  const likeMovie = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/like-movie?user_id=${3}&movie_id=${movies[currentIndex].id}`, {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Handle the response data if needed
    } catch (error) {
      console.error('Error liking movie:', error);
    }
  }
  
  const dislikeMovie = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/dislike-movie?user_id=${3}&movie_id=${movies[currentIndex].id}`, {
        method: "POST"
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Handle the response data if needed
    } catch (error) {
      console.error('Error liking movie:', error);
    }
  }

  const handleSwipe = (direction) => {
    setSwipeDirection(direction);
    if(direction==='like'){
        console.log("like")
        setMovieid(movies[currentIndex].id)
    }
    else if (direction==='dislike'){
        console.log("dislike")
        setMovieid(movies[currentIndex].id)
    }
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
      {swipeState === 0 ? (<>
                  <button className="basic-button" onClick={handleRecommendationsClick}>
                  See Recommendations
                </button>
        <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
          <div id="background">
          <img src={movies.length > 0 && movies[currentIndex]?.imgUrl} alt={movies.length > 0 && movies[currentIndex]?.imgUrl} />
            <h2>{movies.length > 0 && movies[currentIndex]?.title}, {movies.length > 0 && movies[currentIndex]?.release_date}</h2>
            <div className="buttons">
              <button onClick={() => handleSwipe('dislike')}>❌</button>
              <button onClick={() => handleSwipe('skip')}>⛔</button>
              <button onClick={() => handleSwipe('like')}>❤️</button>
            </div>
          </div>
        </div>
        </>
      ) : swipeState === 1 ? (
        <div className="center-column-div">
          <div className="movie-card" style={{opacity: "0.2"}}>
          <div id="background">
          <img src={movies.length > 0 && movies[currentIndex]?.imgUrl} alt={movies.length > 0 && movies[currentIndex]?.imgUrl} />
            <h2>{movies.length > 0 && movies[currentIndex]?.title}, {movies.length > 0 && movies[currentIndex]?.release_date}</h2>
            </div>
          </div>
          <div className="rec-buttons">
          <button className="basic-button" onClick={handleRecommendationsClick}>
            See Recommendations
          </button>
            <button className="basic-button" onClick={() => setSwipeState(2)}>Continue Swiping</button>
          </div>
        </div>
      ) : swipeState === 2 ? (
        <div className="center-column-div">
          <button className="basic-button" onClick={handleRecommendationsClick}>
            See Recommendations
          </button>
          <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
            <div id="background">
            <img src={movies.length > 0 && movies[currentIndex]?.imgUrl} alt={movies.length > 0 && movies[currentIndex]?.imgUrl} />
            <h2>{movies.length > 0 && movies[currentIndex]?.title}, {movies.length > 0 && movies[currentIndex]?.release_date}</h2>
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
          <button className="basic-button" onClick={handleRecommendationsClick}>
            See Recommendations
          </button>
        </div>
      )}
    </div>
  );
}

export default Movies;