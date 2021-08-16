from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


router = DefaultRouter()
router.register(r'tasks', views.TaskListViewSet)
router.register(r'filter_active', views.FilterActiveListViewSet)
router.register(r'filter_completed', views.FilterCompletedListViewSet)

urlpatterns = [
    path('', include(router.urls))
]