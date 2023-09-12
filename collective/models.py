from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Manufacturer(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class CarModel(models.Model):
    name = models.CharField(max_length=120)
    manufacturer = models.ForeignKey(
        Manufacturer, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    created_on = models.DateTimeField(default=timezone.now)
