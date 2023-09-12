from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone


class Post(models.Model):
    author = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='posts')
    created_on = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=120, default='blank')
    manufacturer = models.CharField(max_length=120, default='blank')
    car_model = models.CharField(max_length=180, default='blank')
    engine_layout = models.CharField(max_length=20, default='blank')
    engine_capacity = models.CharField(max_length=20, default='blank')
    colour = models.CharField(max_length=30, default='blank')
    year_of_manufacture = models.CharField(max_length=8, default='0000')


    def get_absolute_url(self):
        return reverse('post-details', kwargs={"pk": self.id})
    # Provides a specific key to be able to search for

    def __str__(self):
        return self.title


class ManufacturerOptions(models.Model):
    manufacturer = models.CharField(max_length=120)

    def __str__(self):
        return self.manufacturer
# Allows me to filter by this at a later point


class CarModelOptions(models.Model):
    car_model = models.CharField(max_length=180)

    def __str__(self):
        return self.car_model
# Allows me to filter by this at a later point


class EngineLayoutOptions(models.Model):
    engine_layout = models.CharField(max_length=20)

    def __str__(self):
        return self.car_model
# Allows me to filter by this at a later point


class EngineCapacityOptions(models.Model):
    engine_capacity = models.CharField(max_length=20)

    def __str__(self):
        return self.engine_capacity
# Allows me to filter by this at a later point


class ColourOptions(models.Model):
    colour = models.CharField(max_length=30)

    def __str__(self):
        return self.colour
# Allows me to filter by this at a later point


class YearOfManafactureOptions(models.Model):
    year_of_manufacture = models.CharField(max_length=8)

    def __str__(self):
        return self.year_of_manufacture
# Allows me to filter by this at a later point