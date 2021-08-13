from django.db import models


# Create your models here.
class Task(models.Model):
    title_of_task = models.CharField("Задание", max_length=150)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title_of_task

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"