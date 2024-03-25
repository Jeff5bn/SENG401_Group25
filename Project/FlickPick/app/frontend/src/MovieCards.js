import React, { useState,useEffect } from 'react';
import './MovieCards.css';

const Duration = 300;

function Movies({ handleRecommendationsClick , userId}) {
  const [swipeState, setSwipeState] = useState(0); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const [movies, setMovies] = useState([]);
  const [movieid,setMovieid] = useState('');
  const [genres, setGenres] = useState([]);

  //States for handling swiping action
  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

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

        // Fetch the genres for the first movie
        if (moviesWithFullImgUrl.length > 0) {
          fetchGenres(moviesWithFullImgUrl[0].genre_ids);
        }
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
      const response = await fetch(`http://127.0.0.1:8000/api/like-movie?user_id=${userId}&movie_id=${movies[currentIndex].id}`, {
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
      const response = await fetch(`http://127.0.0.1:8000/api/dislike-movie?user_id=${userId}&movie_id=${movies[currentIndex].id}`, {
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
      if (currentIndex + 1 < movies.length) {
        fetchGenres(movies[currentIndex + 1].genre_ids);
      }
      setSwipeDirection(null);
    }, Duration);
  };

  const fetchGenres = async (ids) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/convert-genres", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ genres: ids })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const { genres } = await response.json();
      setGenres(genres);

    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  //Functions for handling swiping action
  const swipeActionStart = (event) => {
    if(event.touches){
      setStartX(event.touches[0].clientX);
      setStartY(event.touches[0].clientY);
    }
    else{
      setStartX(event.clientX);
      setStartY(event.clientY);
    }
  };

  const swipeActionMove = (event) => {
    if (startX === null || startY === null) return;

    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const clientY = event.touches ? event.touches[0].clientY : event.clientY;

    const deltaX = clientX - startX;
    const deltaY = clientY - startY;

    setTranslateX(deltaX);
    setTranslateY(deltaY);
  };

  const swipeActionEnd = () => {
    if (startX === null || startY === null) return;

    const deltaX = translateX;
    const deltaY = translateY;

    setStartX(null);
    setStartY(null);
    setTranslateX(0);
    setTranslateY(0);

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        handleSwipe('like');
      } else {
        handleSwipe('dislike');
      }
    } else {
      if (deltaY < 0) {
        handleSwipe('skip');
      }
    }
  };

  return (
    <div className="Movie"
    onMouseDown={swipeActionStart}
    onMouseMove={swipeActionMove}
    onMouseUp={swipeActionEnd}

    onTouchStart={swipeActionStart}
    onTouchMove={swipeActionMove}
    onTouchEnd={swipeActionEnd}
    >
      {swipeState === 0 ? (<>
                  <button className="basic-button" onClick={handleRecommendationsClick}>
                  See Recommendations
                </button>
        <div className={`movie-card ${swipeDirection === 'dislike' ? 'slide-out-left' : swipeDirection === 'like' ? 'slide-out-right' : swipeDirection === 'skip' ? 'slide-out-up' : ''}`}>
          <img src={movies.length > 0 && movies[currentIndex]?.imgUrl} alt={movies.length > 0 && movies[currentIndex]?.imgUrl} />
            <h2>{movies.length > 0 && movies[currentIndex]?.title}</h2>
            <h3>{genres !== undefined && genres.join(', ')}</h3>
        </div>
        <div className="buttons">
              <button onClick={() => handleSwipe('dislike')}>X</button>
              <button onClick={() => handleSwipe('skip')}>&#8634;</button>
              <button onClick={() => handleSwipe('like')}>&#9829;</button>
          </div>
        </>
      ) : swipeState === 1 ? (
        <div className="center-column-div">
          <div className="movie-card" style={{opacity: "0.2"}}>
          <img src={movies.length > 0 && movies[currentIndex]?.imgUrl} alt={movies.length > 0 && movies[currentIndex]?.imgUrl} />
          <h2>{movies.length > 0 && movies[currentIndex]?.title}</h2>
          <h3>{genres !== undefined && genres.join(', ')}</h3>
          </div>
          <div className="rec-buttons">
          <button className="basic-button" onClick={handleRecommendationsClick}>
            See Recommendations
          </button>
            <button className="basic-button" onClick={() => setSwipeState(0)}>Continue Curation</button>
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