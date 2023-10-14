from rest_framework import serializers
from collective.models import Post


class PostSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(queryset=Post.author.field.related_model.objects.all(), required=False)
    gearbox_display = serializers.SerializerMethodField()
    fuel_type_display = serializers.SerializerMethodField()
    drivetrain_display = serializers.SerializerMethodField()
    shape_display = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = '__all__'

    def get_gearbox_display(self, obj):
        return obj.get_gearbox_display()
    
    def get_fuel_type_display(self, obj):
        return obj.get_fuel_type_display()
    
    def get_drivetrain_display(self, obj):
        return obj.get_drivetrain_display()
    
    def get_shape_display(self, obj):
        return obj.get_shape_display()
    
    def validate(self, data):
        for i in range(1, 5):
            mod_title = data.get(f'mod_title_{i}')
            mod_description = data.get(f'mod_description_{i}')

            if mod_title and not mod_description:
                raise serializers.ValidationError({
                    f'mod_description_{i}': f'Description {i} is required if Title {i} is provided.'
                })
            
        return data