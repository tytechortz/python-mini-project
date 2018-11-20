from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=100)
    commentBody = models.CharField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='post')

def __str__(self):
    return self.title
