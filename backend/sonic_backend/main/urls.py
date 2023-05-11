# my_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    # path('logout/', views.logout, name='logout'),
    path('myprofile/', views.my_profile, name='my_profile'),
    # path('intervals/post/', views.post_interval_session, name='post_interval_session')
]
