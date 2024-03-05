from django.shortcuts import render
from rest_framework import generics, status
from .serializers import MovieSerializer, CreateMovieSerializer, UserSerializer, CreateUserSerializer, GenreSerializer
from .models import Movie, User, Genre
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.
# Returns all of the movies in the database
class MovieView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

# Returns movies that have atleast 10,000 ratings votes (hopefully user has seen these movies)
# Right now it is set to only send the first 50 movies in the list
class PopularMovieView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(vote_count__gt=7500).order_by('?')[:60]

# Adds a movie to the database (don't think we'll need this)
class CreateMovieView(APIView):
    serializer_class = CreateMovieSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            backdrop_path = serializer.data.get('backdrop_path')
            genre_ids = serializer.data.get('backdrop_path')
            id = serializer.data.get('id')
            overview = serializer.data.get('overview')
            poster_path = serializer.data.get('poster_path')
            release_date = serializer.data.get('release_date')
            title = serializer.data.get('title')
            queryset = Movie.objects.filter(id=id)
            if queryset.exists():
                movie = queryset[0]
                movie.backdrop_path = backdrop_path
                movie.genre_ids = genre_ids
                movie.overview = overview
                movie.poster_path = poster_path
                movie.release_date = release_date
                movie.title = title
                movie.save(update_fields=['backdrop_path', 'genre_ids', 'overview', 'poster_path', 'release_date', 'title'])
            else:
                movie = Movie(backdrop_path=backdrop_path, genre_ids=genre_ids, id=id, overview=overview, poster_path=poster_path, release_date= release_date, title=title)
                movie.save()
            
            return Response(MovieSerializer(movie).data, status=status.HTTP_201_CREATED)
        
# User Table Views
# Returns all of the users in the database
class UserView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

# Creates a user
class CreateUserView(APIView):
    serializer_class = CreateUserSerializer

    def post(self, request, format=None):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_name = serializer.data.get('user_name')
            password = serializer.data.get('password')
            first_name = serializer.data.get('first_name')
            last_name = serializer.data.get('last_name')
            queryset = User.objects.filter(user_name=user_name)
            # Username already exists
            if queryset.exists():
                return Response({'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)
            else:
                user = User(user_name=user_name, password=password, first_name=first_name, last_name=last_name)
                user.save()
                return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)

class GetUser(APIView):
    serializer_class = UserSerializer
    # Need user_id in user tables
    lookup_url_kwarg = 'user_name'

    def get(self, request, format=None):
        user_name = request.GET.get(self.lookup_url_kwarg)
        if user_name != None:
            user = User.objects.filter(user_name=user_name)
            if len(user) > 0:
                data = UserSerializer(user[0]).data
                return Response(data, status=status.HTTP_200_OK)
            return Response({'Username not found'}, status=status.HTTP_409_CONFLICT)
        return Response({'Bad Request': 'Username not found in request'}, status=status.HTTP_400_BAD_REQUEST)
    
class ResetUserView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
            
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'User not found'}, status=status.HTTP_404_NOT_FOUND)
        user.reset_like_dislike()
        return Response({'Movie Likes and Dislikes Reset'}, status=status.HTTP_200_OK)

class GenreView(generics.ListAPIView):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer

# User likes movie, update their profile
class LikedMovieView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
        movie_id = request.GET.get('movie_id')
            
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'User not found'}, status=status.HTTP_404_NOT_FOUND)
        user.add_liked_movie(movie_id)
        return Response({'Movie Added to Liked Movie List'}, status=status.HTTP_202_ACCEPTED)
    
# User dislikes movie, update their profile
class DislikedMovieView(APIView):
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
        movie_id = request.GET.get('movie_id')
            
        try:
            user = User.objects.get(id=user_id)
        except User.DoesNotExist:
            return Response({'User not found'}, status=status.HTTP_404_NOT_FOUND)
        user.add_disliked_movie(movie_id)
        return Response({'Movie Added to Disliked Movie List'}, status=status.HTTP_202_ACCEPTED)
    
# User dislikes movie, update their profile
class RecommendMovieView(APIView):
    serializer_class1 = UserSerializer
    serializer_class2 = MovieSerializer

    def get_user(self, user_id):
        try:
            return User.objects.get(id=user_id)
        except User.DoesNotExist:
            return None

    def get_movie(self, movie_id):
        try:
            return Movie.objects.get(id=movie_id)
        except Movie.DoesNotExist:
            return None

    def get_liked_genres(self, user):
        genre_counter = {}
        liked_movies = user.get_liked_movies()

        for movie_id in liked_movies:
            movie = self.get_movie(movie_id)
            if movie:
                genres = movie.get_genres()
                for genre in genres:
                    genre_counter[genre] = genre_counter.get(genre, 0) + 1
        return genre_counter

    def get(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
        user = self.get_user(user_id)
        if not user:
            return Response({'User not found'}, status=status.HTTP_404_NOT_FOUND)

        liked_genres = self.get_liked_genres(user)

        # Printing to confirm it works
        for genre, count in liked_genres.items():
            print(genre, ':', count)

        top_five_genres = sorted(liked_genres.items(), key=lambda x: x[1], reverse=True)[:5]
        top_five_genres_dict = dict(top_five_genres)

        print(top_five_genres_dict)

        return Response({'Works so far'}, status=status.HTTP_202_ACCEPTED)