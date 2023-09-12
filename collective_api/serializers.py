from rest_framework import serializers
from collective.models import Post


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'author',
            'title',
            'manufacturer',
            'car_model',
            'engine_layout',
            'engine_capacity',
            'colour',
            'year_of_manufacture',
        ]