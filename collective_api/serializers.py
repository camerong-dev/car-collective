from rest_framework import serializers
from collective.models import Post


class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)

    class Meta:
        model = Post
        fields = (
            'id',
            'title',
            'author',
            'author_name',
            'car_model',
            'manufacturer',
            'year_of_manufacture',
            'engine_layout',
            'engine_capacity',
            'colour',
            'shape',
            'gearbox',
            'fuel_type',
            'drivetrain',
            'image_1',
            'image_2',
            'image_3',
            'image_4',
            'image_5',
            'mod_title_1',
            'mod_description_1',
            'mod_title_2',
            'mod_description_2',
            'mod_title_3',
            'mod_description_3',
            'mod_title_4',
            'mod_description_4',
            'mod_title_5',
            'mod_description_5',
            'description',
        )

    author = serializers.PrimaryKeyRelatedField(queryset=Post.author.field.related_model.objects.all(), required=False, write_only=True)

    
    def validate(self, data):
        for i in range(1, 5):
            mod_title = data.get(f'mod_title_{i}')
            mod_description = data.get(f'mod_description_{i}')

            if mod_title and not mod_description:
                raise serializers.ValidationError({
                    f'mod_description_{i}': f'Description {i} is required if Title {i} is provided.'
                })
            
        return data