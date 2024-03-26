import React, { useState,useEffect } from 'react';
import GallaryPopup from './GallaryPopup';
import './Gallary.css';
import './GallaryCards.css';
import './GallaryPopup.css';

const Duration = 50;

function Gallary({handleSelectionClick, userId}) {
    const [movies, setMovies] = useState([]);
    const [swipeDirection, setSwipeDirection] = useState(null);
    const [movieid,setMovieid] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);

    const [popup, setPopup] = useState(false);
    const [PopupState, setPopupState] = useState(null); 

    //For Images
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
      //END

    //Like and Dislike functionallity

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

    const handleLike = (like, index) => {
        setSwipeDirection(like);
        if(like==='like'){
            setMovieid(movies[index].id)
            setCurrentIndex(index)
        }
        else if (like==='dislike'){
            setMovieid(movies[index].id)
            setCurrentIndex(index)
        }
        setTimeout(() => {
            setSwipeDirection(null);
          }, Duration);
        setPopup(!popup);

      };
      //END
      const togglePopUp = (direction) => {
          setMovieid(null);
          setSwipeDirection(null);
          setPopupState(direction);
          setPopup(!popup) 
      }; 
    
    return (
        <div>
        <div id = "Gallary">
            <div id="topbar">
            <button className="menuButton" onClick={handleSelectionClick} type='button'>See Curation</button>
            </div>
            {movies.length > 0 && (<>
            <div id='userRecc'>
            <h1 class="text-left ...">Recommend For You</h1>

            <div className='flex'> 
            {['RecDislike0', 'RecDislike1', 'RecDislike2',
            'RecDislike3', 'RecDislike4', 'RecDislike5', 
            'RecDislike6', 'RecDislike7'].map((recDislike, movieIndex) => (
                <div key={movieIndex}>
                    <button 
                        className={`movie-card2 ${PopupState === recDislike ? 'toggle' : ''}`} 
                        onClick={() => togglePopUp(recDislike)}
                    >
                        <img src={movies[movieIndex].imgUrl} alt={movies[movieIndex].title} />
                    </button>
                    {/*Popup UI*/}
                    {popup && recDislike === PopupState && (
                        <div className='popup'>
                            <button className = "closeButton" onClick={() => togglePopUp(recDislike)}>X</button>
                            <div className='contentBox'>
                                <div className='popupImage'>
                                    <img src={movies[movieIndex].imgUrl} alt={movies[movieIndex].title} />
                                </div>
                                <div className='textDescription'>
                                    <h1>
                                        {movies[movieIndex].title}
                                    </h1>
                                    <h2>
                                        Release Date: {movies[movieIndex].release_date}
                                    </h2>
                                    <h2>
                                        Total Votes: {movies[movieIndex].vote_count}
                                    </h2>
                                    <br></br>
                                    <p>
                                        {movies[movieIndex].overview}
                                    </p>
                                    <div className='bottomInfo'>
                                        <h1>Like: <button className='likeAndDislike' onClick={() => handleLike('like', movieIndex)}>❤️</button></h1>
                                        <h1>Dislike: <button className='likeAndDislike' onClick={() => handleLike('dislike', movieIndex)}>❌</button></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            </div>       
            </div>
            
            <div id='popularRecc'>
                <h1 class="text-left ...">Featured Today</h1>
                <div className='flex'> 
                    {['FeatDislike1', 'FeatDislike2', 'FeatDislike3', 
                    'FeatDislike4', 'FeatDislike5', 'FeatDislike6', 
                    'FeatDislike7', 'FeatDislike8'].map((featDislike, movieIndex) => (
                    <div key={movieIndex}>
                        <button 
                            className={`movie-card2 ${PopupState === featDislike ? 'toggle' : ''}`} 
                            onClick={() => togglePopUp(featDislike)}
                        >
                            <img src={movies[movieIndex + 8].imgUrl} alt={movies[movieIndex + 8].title} />
                        </button>
                    {/*Popup UI*/}
                    {popup && featDislike === PopupState && (
                        <div className='popup'>
                            <button className = "closeButton" onClick={() => togglePopUp(featDislike)}>X</button>
                            <div className='contentBox'>
                                <div className='popupImage'>
                                    <img src={movies[movieIndex + 8].imgUrl} alt={movies[movieIndex + 8].title} />
                                </div>
                                <div className='textDescription'>
                                    <h1>
                                        {movies[movieIndex + 8].title}
                                    </h1>
                                    <h2>
                                        Release Date: {movies[movieIndex + 8].release_date}
                                    </h2>
                                    <h2>
                                        Total Votes: {movies[movieIndex + 8].vote_count}
                                    </h2>
                                    <br></br>
                                    <p>
                                        {movies[movieIndex + 8].overview}
                                    </p>
                                    <div className='bottomInfo'>
                                        <h1>Like: <button className='likeAndDislike' onClick={() => handleLike('like', movieIndex + 8)}>❤️</button></h1>
                                        <h1>Dislike: <button className='likeAndDislike' onClick={() => handleLike('dislike', movieIndex + 8)}>❌</button></h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
            </div>     
            </div>
            </>)}

            <div id='bottomBar'>
            </div>
        </div>
    </div>
    );
}

export default Gallary;