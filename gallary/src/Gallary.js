import React, { useState } from 'react';
import './Gallary.css';
import './MovieCards.css';

//Temporary movie database
const movies = [
    { id: 1, name: "Movie 1", genre: "Action", imgUrl: "https://image.tmdb.org/t/p/original///7lTnXOy0iNtBAdRP3TZvaKJ77F6.jpg"},
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
];



function Gallary() {

    const [swipeDirection, setSwipeDirection] = useState(null);
    
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
                <button className="menuButton">Curation</button>
                <button className='menuButton'>Gallary</button>
            </div>
            <div id='userRecc'>
            <h1 class="text-left ...">Recommend For You</h1>

            <div className='flex'> 
                <button className={`movie-card ${swipeDirection === 'RecDislike1' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike1')}>
                    <img src={movies[0].imgUrl} alt={movies[0].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike2' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike2')}>
                    <img src={movies[1].imgUrl} alt={movies[1].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike3' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike3')}>
                    <img src={movies[2].imgUrl} alt={movies[2].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike4' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike4')}>
                    <img src={movies[3].imgUrl} alt={movies[3].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike5' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike5')}>
                    <img src={movies[4].imgUrl} alt={movies[4].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike6' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike6')}>
                    <img src={movies[5].imgUrl} alt={movies[5].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike7' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike7')}>
                    <img src={movies[6].imgUrl} alt={movies[6].name} />
                </button>
                <button className={`movie-card ${swipeDirection === 'RecDislike8' ? 'slide-out-up' : ''}`} onClick={() => handleSwipe('RecDislike8')}>
                    <img src={movies[7].imgUrl} alt={movies[7].name} />
                </button>
            </div>       

            </div>
            <div id='popularRecc'>
                <h1 class="text-left ...">Featured Today</h1>
                <div className='flex'> 
                    <button className={`movie-card ${swipeDirection === 'FeatDislike1' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike1')}>
                        <img src={movies[10].imgUrl} alt={movies[10].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike2' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike2')}>
                        <img src={movies[9].imgUrl} alt={movies[9].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike3' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike3')}>
                        <img src={movies[7].imgUrl} alt={movies[7].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike4' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike4')}>
                        <img src={movies[6].imgUrl} alt={movies[6].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike5' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike5')}>
                        <img src={movies[5].imgUrl} alt={movies[5].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike6' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike6')}>
                        <img src={movies[4].imgUrl} alt={movies[4].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike7' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike7')}>
                        <img src={movies[3].imgUrl} alt={movies[3].name} />
                    </button>
                    <button className={`movie-card ${swipeDirection === 'FeatDislike8' ? 'slide-out-down' : ''}`} onClick={() => handleSwipe('FeatDislike8')}>
                        <img src={movies[8].imgUrl} alt={movies[8].name} />
                    </button>

                </div>     

            </div>
            <div id='bottomBar'>

            </div>
        </div>
    );
}

export default Gallary;