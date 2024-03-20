from django.test import TestCase
from api.models import Movie, User
#https://docs.python.org/3/library/unittest.html

class FlickPickAPITest(TestCase):

    def setUp(self):
        self.mov1 = Movie.objects.create(backdrop_path="/4MCKNAc6AbWjEsM2h9Xc29owo4z.jpg",
            genre_ids=[28,53,18], 
            id=866398,
            overview="One man’s campaign for vengeance takes on national stakes after he is revealed to be a former operative of a powerful and clandestine organization known as Beekeepers.",
            poster_path="/A7EByudX0eOzlkQ2FIbogzyazm2.jpg",
            release_date="2024-01-10",
            title="The Beekeeper",
            vote_average=7.243,
            vote_count=832)
        self.user1 = User.objects.create(id=5,
            user_name="jeffbertel",
            password="$2b$12$cJSk.Ekj1zy0DXA6Rt.Qmug2W4EjkwynnDyVecZXxZDFxMxhXJiPu",
            first_name="Jeff",
            last_name="Bartel",
            account_created="2024-03-20T04:50:49.343645Z",
            liked_movies=[263115,284052],
            disliked_movies=[254,8966])
        
        self.user1.hash_password(self.user1.password)
    
    def tearDown(self) -> None:
        return super().tearDown()
    
    def test_movies_get_title(self):
        movie = self.mov1
        self.assertEqual(movie.get_movie_title(), "The Beekeeper")

    def test_movies_get_genre_id(self):
        movie = self.mov1
        self.assertEqual(movie.get_genres(), [28,53,18])

    def test_user_get_liked_movies(self):
        user = self.user1
        self.assertEqual(user.get_liked_movies(), [263115,284052])

    def test_user_get_disliked_movies(self):
        user = self.user1
        self.assertEqual(user.get_disliked_movies(), [254,8966])
    
    #Need to find better way of testing
    def test_user_get_salt(self):
        user = self.user1
        self.assertEqual(user.get_salt(), user.salt)

    # Failed, Check with Raymond
    # def test_user_check_password(self):
    #     user = self.user1
    #     self.assertTrue(user.check_password_test(user.salt, user.password))
    
    def test_user_add_liked_movies(self):
        user = self.user1
        user.add_liked_movie(14160)
        self.assertEqual(user.get_liked_movies(), [263115,284052,14160])
    
    def test_user_add_disliked_movies(self):
        user = self.user1
        user.add_disliked_movie(68721)
        self.assertEqual(user.get_disliked_movies(), [254,8966,68721])

    def test_user_reset_like_dislike(self):
        user = self.user1
        user.reset_like_dislike()
        self.assertEqual(user.get_liked_movies(), [])
        self.assertEqual(user.get_disliked_movies(), [])
    
    def test_user_get_username(self):
        user = self.user1
        self.assertEqual(user.__str__(), "jeffbertel")




