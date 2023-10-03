from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

class Shape(models.Model):
    shape = models.CharField(max_length=80)

    def __str__(self):
        return self.shape


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    shape = models.ForeignKey(
        Shape, on_delete=models.PROTECT, default=1)
    created_on = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=120)
    manufacturer = models.CharField(max_length=120)
    car_model = models.CharField(max_length=180)
    engine_layout = models.CharField(max_length=20, null=True, blank=True)
    engine_capacity = models.CharField(max_length=20, null=True, blank=True)
    colour = models.CharField(max_length=30)
    year_of_manufacture = models.CharField(max_length=8)
    seats = models.CharField(max_length=2, null=True, blank=True)


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
        return self.engine_layout
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


class YearOfManufactureOptions(models.Model):
    year_of_manufacture = models.CharField(max_length=8)

    def __str__(self):
        return self.year_of_manufacture
# Allows me to filter by this at a later point