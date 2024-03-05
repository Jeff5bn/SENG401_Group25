from django.urls import path
from .views import MovieView, PopularMovieView, CreateMovieView, GetUser, UserView, CreateUserView, GenreView, LikedMovieView, DislikedMovieView, ResetUserView, RecommendMovieView

urlpatterns = [
    # URL patterns for movie model
    path('movies', MovieView.as_view()),
    path('popular-movies',PopularMovieView.as_view()),
    path('create-movie', CreateMovieView.as_view()),

    # URL patterns for user model
    path('users', UserView.as_view()),
    path('create-user', CreateUserView.as_view()),
    path('get-user', GetUser.as_view()),
    path('like-movie', LikedMovieView.as_view()),
    path('dislike-movie', DislikedMovieView.as_view()),
    path('reset-user-preferences', ResetUserView.as_view()),

    # URL patterns for recommendations
    path('recommend-movies', RecommendMovieView.as_view()),

    # Misc URL patterns
    path('get-genres', GenreView.as_view())
]
