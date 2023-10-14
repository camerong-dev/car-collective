from rest_framework import serializers
from collective.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Post.author.field.related_model.objects.all(), required=False)
    
    class Meta:
        model = Post
        fields = [
            'id',
            'author',
            'title',
            'manufacturer',
            'car_model',
            'engine_layout',
            'engine_capacity',
            'colour',
            'year_of_manufacture',
        ]