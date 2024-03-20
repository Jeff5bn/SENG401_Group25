from django.db import models
from django.contrib.auth.models import AbstractUser
import random
import bcrypt

# Function to generate new id, if IMDB id nt available
def generate_unique_id():
    length = 6

    while True:
        newId = random.randint(100000, 999999)
        if Movie.objects.filter(id=newId).count() == 0:
            break

    return newId

# Create your models here.
class Movie(models.Model):
    backdrop_path = models.TextField(null=True)
    genre_ids = models.JSONField()
    id = models.BigIntegerField(primary_key=True, unique=True, null=False, default=generate_unique_id)
    overview = models.TextField()
    poster_path = models.TextField()
    release_date = models.DateField()
    title = models.TextField(null=False)
    vote_average = models.FloatField(default=0.0)
    vote_count = models.BigIntegerField(default=0)

    def get_genres(self):
        return self.genre_ids
    
    def get_movie_title(self):
        return self.title

class User(models.Model):
    user_name = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128, null=False)
    salt = models.CharField(max_length=128)
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)
    account_created = models.DateTimeField(auto_now_add=True)
    liked_movies = models.JSONField(default=list)
    disliked_movies = models.JSONField(default=list)

    def get_liked_movies(self):
        return self.liked_movies
    
    def get_disliked_movies(self):
        return self.disliked_movies
    
    def get_salt(self):
        return self.salt
    
    def hash_password(self, password):
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return salt, hashed
    
    def check_password_test(self, salt, entered_password):
        hashed = bcrypt.hashpw(entered_password.encode('utf-8'), salt.encode('utf-8'))
        hashed = hashed
        return hashed == self.password

    def add_liked_movie(self, movie_id):
        movie_id = int(movie_id)
        if movie_id not in self.liked_movies:
            self.liked_movies.append(movie_id)
            self.save()

    def add_disliked_movie(self, movie_id):
        movie_id = int(movie_id)
        if movie_id not in self.disliked_movies:
            self.disliked_movies.append(movie_id)
            self.save()

    def reset_like_dislike(self):
        self.liked_movies = []
        self.disliked_movies = []
        self.save()

    def __str__(self):
        return self.user_name

class Genre(models.Model):
    id = models.BigIntegerField(primary_key=True, unique=True, null=False)
    name = models.CharField(max_length=50)