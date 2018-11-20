from django.urls import path
from .views import Posts , Post_Detail

urlpatterns = [
    path('', Posts.as_view()),
    path('<int:pk>/', Post_Detail.as_view()),
]