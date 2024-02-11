from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('application/', views.application),
    path('login/', views.user_login, name='login'),
    path('signup/', views.register, name='signup'),
    path('application/create', views.create_application, name='create_application')
]
    

