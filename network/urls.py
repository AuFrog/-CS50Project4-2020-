
from django.urls import path

from . import views

urlpatterns = [
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
      
    # API Routes
    path('posts', views.compose, name='compose'),
    path('allpost', views.allpost, name='allpost'),
    path('like', views.like, name='like'),
    path('profile/<int:uid>', views.profile, name='profile'),
]
