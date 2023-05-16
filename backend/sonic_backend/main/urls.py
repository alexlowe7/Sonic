# my_app/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('get_user/', views.get_user, name='get_user'), 
    path('register/', views.register, name='register'),
    path('login/', views.login_user, name='login_user'),
    path('logout/', views.logout_user, name='logout_user'),
    # path('myprofile/', views.my_profile, name='my_profile'),
    path('intervals/create/', views.create_interval_session, name='create_interval_session'),
    path('intervals/update/', views.update_interval_session, name='update_interval_session'),
    path('stats/', views.stats, name='stats')   
]
