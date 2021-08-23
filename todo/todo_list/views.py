from django.shortcuts import render
from django.views.generic.base import View

from .models import Task


class TodoView(View):
    def get(self, request):
        todos = Task.objects.all()
        return render(request, "todo_list/index.html", {"todos": todos})


class FilterView(View):
    def get(self, request):
        filter_active = Task.objects.filter(is_active=False)
        return render(request, "todo_list/index.html", {"filter_active": filter_active})


class FilterView(View):
    def get(self, request):
        filter_completed = Task.objects.filter(is_active=True)
        return render(request, "todo_list/index.html", {"filter_completed": filter_completed})


class FilterView(View):
    def get(self, request):
        filter_active = Task.objects.filter(is_active=False)
        return render(request, "todo_list/index.html", {"filter_active": filter_active})


class FilterView(View):
    def get(self, request):
        filter_completed = Task.objects.filter(is_active=True)
        return render(request, "todo_list/index.html", {"filter_completed": filter_completed})

