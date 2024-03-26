from django.shortcuts import render
from rest_framework import generics, status
from .serializers import MovieSerializer, CreateMovieSerializer, UserSerializer, CreateUserSerializer, LoginUserSerializer, GenreSerializer
from .models import Movie, User, Genre
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from django.core.exceptions import ObjectDoesNotExist


# Create your views here.
# Returns all of the movies in the database
class MovieView(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

# Returns movies that have atleast 7,500 ratings votes (hopefully user has seen these movies)
# Right now it is set to only send the first 60 movies in the list
class PopularMovieView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(vote_count__gt=7500).order_by('?')[:60]

# Returns the most popular movies (ordered most to least)
class OrderedPopularMovieView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(vote_count__gt=15000).order_by('-vote_average')[:60]

# Returns the most recent movies released (most recent to oldest)
class RecentMovieView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(release_date__lte=date.today()).order_by('-release_date')[:60]

# Returns the upcoming movie releases (closest to furthest)
class UpcomingMovieView(generics.ListAPIView):
    serializer_class = MovieSerializer
    queryset = Movie.objects.filter(release_date__gte=date.today())[:60]

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

            # Username already exists
            try:
                existing_user = User.objects.get(user_name=user_name)
                return Response({"user_id": -1, "message": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)
            except ObjectDoesNotExist:
                salt, hashed_password = User().hash_password(password)
                user = User(user_name=user_name, password=hashed_password.decode('utf-8'), salt=salt.decode('utf-8'), first_name=first_name, last_name=last_name)
                user.save()
                created_user = User.objects.get(user_name=user_name)
                print(created_user.id)
                return Response({"user_id": created_user.id, "message": "Account Created"}, status=status.HTTP_201_CREATED)
        return Response({"user_id" : -1, "message": "Error Creating Account."}, status=status.HTTP_400_BAD_REQUEST)

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
    
class UserLoginTest(APIView):
    serializer_class = LoginUserSerializer

    def post(self, request, format=None):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            user_name = serializer.data.get('user_name')
            password = serializer.data.get('password')
            try:
                user = User.objects.get(user_name=user_name)
                if user.check_password_test(user.get_salt(), password):
                    return Response({"user_id" : user.id, "message": "Authentication Successful"}, status=status.HTTP_200_OK)
                else:
                    return Response({"user_id" : -1, "message": "Invalid Username or Password"}, status=status.HTTP_404_NOT_FOUND)
            except User.DoesNotExist:
                return Response({"user_id" : -1, "message": "Invalid Username or Password"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        disliked_movies = user.get_disliked_movies()

        for movie_id in liked_movies:
            movie = self.get_movie(movie_id)
            if movie:
                genres = movie.get_genres()
                for genre in genres:
                    genre_counter[genre] = genre_counter.get(genre, 0) + 1

        for movie_id in disliked_movies:
            movie = self.get_movie(movie_id)
            if movie:
                genres = movie.get_genres()
                for genre in genres:
                    if genre_counter.get(genre, 0) > 0:
                        genre_counter[genre] -= 1

        return genre_counter
    
    def movie_score(self, movie, liked_genres):
        number_of_genres = len(movie.get_genres())
        movie_score = 0
        max_score = 0.0

        for score in liked_genres.values():
            max_score += score

        for genre in movie.get_genres():
            if genre in liked_genres:
                movie_score += liked_genres[genre]

        if number_of_genres < 5:
            movie_score = ((movie_score / max_score) * ((10.0 - number_of_genres) / 5))
        else:
            movie_score = movie_score / max_score        

        if movie_score > 1.0:
            return 1.0
        else:
            return movie_score
    
    def movie_recommendations(self, user, liked_genres):
        recommended_movies = []
        queryset = Movie.objects.all()

        movie_scores = []
        for movie in queryset:
            if (movie.id not in user.get_liked_movies()) and (movie.id not in user.get_disliked_movies()):
                score = self.movie_score(movie, liked_genres)
                movie_scores.append((movie, score))

        # Sort the list based on scores in descending order
        movie_scores.sort(key=lambda x: x[1], reverse=True)

        for movie, score in movie_scores[:60]:
            # Serialize the movie object
            movie_data = MovieSerializer(movie).data
            movie_data['match'] = score
            recommended_movies.append(movie_data)

        return recommended_movies

    def get(self, request, *args, **kwargs):
        user_id = request.GET.get('user_id')
        user = self.get_user(user_id)
        if not user:
            return Response({'User not found'}, status=status.HTTP_404_NOT_FOUND)

        liked_genres = self.get_liked_genres(user)

        top_five_genres = sorted(liked_genres.items(), key=lambda x: x[1], reverse=True)[:5]
        top_five_genres_dict = dict(top_five_genres)

        # Go through movies to find movies that bet match
        recommended_movies = self.movie_recommendations(user, top_five_genres_dict)

        return Response(recommended_movies, status=status.HTTP_200_OK)
    
class ConvertGenreView(APIView):
    def post(self, request, *args, **kwargs):
        genres = request.data.get('genres', [])

        converted_genres = []
        for genre in genres:
            try:
                genre_mapping = Genre.objects.get(id=genre)
                converted_genres.append(genre_mapping.name)
            except Genre.DoesNotExist:
                pass

        return Response({"genres" : converted_genres}, status=status.HTTP_200_OK)