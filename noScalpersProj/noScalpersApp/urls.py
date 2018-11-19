from django.urls import path
from .views import Posts #, Post_detail

urlpatters = [
    path('', Posts.as_view()),
]