import json

from django.core.exceptions import ObjectDoesNotExist
from rest_framework.response import Response
from rest_framework import viewsets

from api.serializers import TaskListSerializer #, FilterTaskListSerializer
from todo_list.models import Task


class TaskListViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskListSerializer


class FilterActiveListViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.filter(is_active=False)
    serializer_class = TaskListSerializer


class FilterCompletedListViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.filter(is_active=True)
    serializer_class = TaskListSerializer









