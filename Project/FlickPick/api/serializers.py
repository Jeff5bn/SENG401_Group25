from rest_framework import serializers
from .models import Movie, User, Genre

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('backdrop_path', 'genre_ids', 'id', 'overview', 'poster_path', 'release_date', 'title', 'vote_average', 'vote_count')

class CreateMovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('backdrop_path', 'genre_ids', 'id', 'overview', 'poster_path', 'release_date', 'title')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'user_name', 'password', 'first_name', 'last_name', 'account_created', 'liked_movies', 'disliked_movies']


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_name', 'password', 'first_name', 'last_name']

class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['id', 'name']