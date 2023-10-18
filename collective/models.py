from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.conf import settings


class Post(models.Model):
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    shape = models.CharField(max_length=20)
    created_on = models.DateTimeField(default=timezone.now)
    title = models.CharField(max_length=120)
    manufacturer = models.CharField(max_length=120)
    car_model = models.CharField(max_length=180)
    engine_layout = models.CharField(max_length=20)
    engine_capacity = models.CharField(max_length=20)
    colour = models.CharField(max_length=30)
    year_of_manufacture = models.CharField(max_length=8)
    gearbox = models.CharField(max_length=10)
    fuel_type = models.CharField(max_length=10)
    drivetrain = models.CharField(max_length=20)

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

    description = models.CharField(max_length=840)

    def get_absolute_url(self):
        return reverse('post-id', kwargs={"pk": self.id})
    # Provides a specific key to be able to search for

    def __str__(self):
        return self.title
    
    def like_count(self):
        return self.like_set.count()
    

class Like(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='likes')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    timestamp = models.DateTimeField(default=timezone.now)

    class Meta:
        unique_together = ('user', 'post')

    def __str__(self):
        return f"{self.user.user_name} likes {self.post.title}"
    

class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=120)
    timestamp = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return f"{self.author.username} commented on {self.post.title}"


