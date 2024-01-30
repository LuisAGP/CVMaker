from django.db import models
from django.contrib.auth.models import User
from .utils import users_directory_path

# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=60)
    lastname = models.CharField(max_length=60, null=True)
    grade = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=15, null=True)
    photo = models.ImageField(upload_to=users_directory_path, null=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"