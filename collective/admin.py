from django.contrib import admin
from . import models


@admin.register(models.Post)
class AuthorAdmin(admin.ModelAdmin):
    list_display = (
        'title', 'id','manufacturer', 'car_model', 'year_of_manufacture', 'shape', 'like_count')
    
    def like_count(self, obj):
        return obj.likes.count()


