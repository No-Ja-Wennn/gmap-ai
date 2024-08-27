from django.urls import path
from . import views

urlpatterns = [
    path("get/", views.get_locations),
    path("getnames/", views.get_name_locations),
    path("getdistance/", views.get_distance)
]
