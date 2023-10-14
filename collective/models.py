from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings

class Shape(models.Model):
    SHAPE_CHOICES = [
        ('hatchback', 'Hatchback'),
        ('saloon', 'Saloon'),
        ('estate', 'Estate'),
        ('suv', 'SUV'),
        ('convertible', 'Convertible'),
    ]
    shape = models.CharField(max_length=20, choices=SHAPE_CHOICES)

    def __str__(self):
        return self.shape


class Post(models.Model):
    GEARBOX_CHOICES = [
        ('manual', 'Manual'),
        ('automatic', 'Automatic'),
    ]
    FUEL_TYPE_CHOICES = [
        ('petrol', 'Petrol'),
        ('diesel', 'Diesel'),
        ('hybrid', 'Hybrid'),
        ('electric', 'Electric'),
    ]
    DRIVETRAIN_CHOICES = [
        ('front-wheel drive', 'Front-Wheel Drive'),
        ('rear-wheel drive', 'Rear-Wheel Drive'),
        ('four-wheel drive', 'Four-Wheel Drive'),
    ]
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    shape = models.ForeignKey(
        Shape, on_delete=models.PROTECT)
    created_on = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=120)
    manufacturer = models.CharField(max_length=120)
    car_model = models.CharField(max_length=180)
    engine_layout = models.CharField(max_length=20)
    engine_capacity = models.CharField(max_length=20)
    colour = models.CharField(max_length=30)
    year_of_manufacture = models.CharField(max_length=8)
    gearbox = models.CharField(max_length=10, choices=GEARBOX_CHOICES)
    fuel_type = models.CharField(max_length=10, choices=FUEL_TYPE_CHOICES)
    drivetrain = models.CharField(max_length=20, choices=DRIVETRAIN_CHOICES)

    image_1 = models.ImageField(upload_to='car-collective/media/')
    image_2 = models.ImageField(upload_to='car-collective/media/', blank=True, null=True)
    image_3 = models.ImageField(upload_to='car-collective/media/', blank=True, null=True)
    image_4 = models.ImageField(upload_to='car-collective/media/', blank=True, null=True)
    image_5 = models.ImageField(upload_to='car-collective/media/', blank=True, null=True)

    mod_title_1 = models.CharField(max_length=40, blank=True, null=True)
    mod_description_1 = models.CharField(max_length=160, blank=True, null=True)

    mod_title_2 = models.CharField(max_length=40, blank=True, null=True)
    mod_description_2 = models.CharField(max_length=160, blank=True, null=True)

    mod_title_3 = models.CharField(max_length=40, blank=True, null=True)
    mod_description_3 = models.CharField(max_length=160, blank=True, null=True)

    mod_title_4 = models.CharField(max_length=40, blank=True, null=True)
    mod_description_4 = models.CharField(max_length=160, blank=True, null=True)

    mod_title_5 = models.CharField(max_length=40, blank=True, null=True)
    mod_description_5 = models.CharField(max_length=160, blank=True, null=True)



    def get_absolute_url(self):
        return reverse('post-id', kwargs={"pk": self.id})
    # Provides a specific key to be able to search for

    def __str__(self):
        return self.title


