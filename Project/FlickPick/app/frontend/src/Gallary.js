import React, { useState,useEffect } from 'react';
import './Gallary.css';
import './GallaryCards.css';


function Gallary({handleSelectionClick, userId}) {
    const [movies, setMovies] = useState([]);
    const [swipeDirection, setSwipeDirection] = useState(null);
    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/recommend-movies?user_id=${userId}`, { method: "GET" })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            console.log(response)
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

    const handleSwipe = (direction) => {
      setSwipeDirection(direction);
      // Code to handle like/RecDislike
      setTimeout(() => {
        setSwipeDirection(null);
      }, 200); // Duration of the transition
    };  

    return (
        <div id = "Gallary">
            <div id="topbar">
            <button className="basic-button" onClick={handleSelectionClick} type='button'>Curation</button>
                <button className="basic-button">Gallary</button>
            </div>
            {movies.length > 0 && (<>
            <div id='userRecc'>
            <h1 class="text-left ...">Recommend For You</h1>

            <div className='flex'> 
            <button className={`movie-card2 ${swipeDirection === 'RecDislike1' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike1')}>
                            <img src={movies[0].imgUrl} alt={movies[0].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike1' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike1')}>
                            <img src={movies[1].imgUrl} alt={movies[1].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike2' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike2')}>
                            <img src={movies[2].imgUrl} alt={movies[2].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike3' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike3')}>
                            <img src={movies[3].imgUrl} alt={movies[3].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike4' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike4')}>
                            <img src={movies[4].imgUrl} alt={movies[4].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike5' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike5')}>
                            <img src={movies[5].imgUrl} alt={movies[5].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike6' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike6')}>
                            <img src={movies[6].imgUrl} alt={movies[6].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike7' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike7')}>
                            <img src={movies[7].imgUrl} alt={movies[7].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'RecDislike8' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike8')}>
                            <img src={movies[8].imgUrl} alt={movies[8].title} />
                        </button>
            </div>       

            </div>
            <div id='popularRecc'>
                <h1 class="text-left ...">Featured Today</h1>
                <div className='flex'> 
                <button className={`movie-card2 ${swipeDirection === 'FeatDislike1' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike1')}>
                            <img src={movies[8].imgUrl} alt={movies[8].title} />
                        </button>
                        <button className={`movie-card2 ${swipeDirection === 'FeatDislike2' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike2')}>
                            <img src={movies[9].imgUrl} alt={movies[9].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike3' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike3')}>
                            <img src={movies[10].imgUrl} alt={movies[10].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike4' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike4')}>
                            <img src={movies[11].imgUrl} alt={movies[11].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike5' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike5')}>
                            <img src={movies[12].imgUrl} alt={movies[12].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike6' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike6')}>
                            <img src={movies[13].imgUrl} alt={movies[13].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike7' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike7')}>
                            <img src={movies[14].imgUrl} alt={movies[14].title} />
                        </button>                <button className={`movie-card2 ${swipeDirection === 'FeatDislike8' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('FeatDislike8')}>
                            <img src={movies[15].imgUrl} alt={movies[15].title} />
                        </button>

                </div>     

            </div>
            </>)}
            <div id='bottomBar'>

            </div>
        </div>
    );
}

export default Gallary;