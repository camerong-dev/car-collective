from rest_framework import serializers
from .models import NewUser
from django.db.utils import IntegrityError

class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True)
    user_name = serializers.CharField(required=True)
    password = serializers.CharField(min_length=10, write_only=True)
    
    class Meta:
        model = NewUser
        fields = ('email', 'user_name', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email(self, value):
        if NewUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use. Please use a different email.")
        return value
    
    def validate_user_name(self, value):
        if NewUser.objects.filter(user_name=value).exists():
            raise serializers.ValidationError("Username is already in use. Please use a different username.")
        return value


    def create(self, validated_data):
        try:
            password = validated_data.pop('password', None)
            instance = self.Meta.model(**validated_data)
            if password is not None:
                instance.set_password(password)
                instance.save()
                return instance
        except IntegrityError:
            raise serializers.ValidationError({"detail": "User with this email or username already exists."})


class UsernameSerializer(serializers.Serializer):
    user_name = serializers.CharField()