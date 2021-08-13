from django.shortcuts import render
from django.views.generic.base import View

from .models import Task


class TodoView(View):
    def get(self, request):
        todos = Task.objects.all()
        return render(request, "todo_list/index.html", {"todos": todos})

