from django.urls import path
from .views import CreateUser, Authentication, User_Detail, logout, getToken

urlpatterns = [
    path('', CreateUser.as_view()),
    path('login/', Authentication.as_view()),
    path('<int:pk>/', User_Detail.as_view()),
    path('logout/', logout),
    path('getToken/', getToken)
]