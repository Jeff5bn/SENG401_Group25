from django.test import TestCase
from django.conf import settings
from django.contrib.auth.password_validation import validate_password
#https://docs.python.org/3/library/unittest.html

class FlickPickConfigTest(TestCase):

    # Tests strength of secret key with validate_password
    def test_secret_key_strength(self):
        SECRET_KEY = settings.SECRET_KEY
        #self.assertNotEqual(SECRET_KEY, "abc123")
        try:
            is_strong = validate_password(SECRET_KEY)
        except Exception as e:
            msg = f'Weak Secret Key {e.messages}'
            self.fail(msg)