from django.urls import path

from . import views


urlpatterns = [
    path("", views.TodoView.as_view()),
    path("filter_active", views.FilterView.as_view()),
    path("filter_completed", views.FilterView.as_view()),
]