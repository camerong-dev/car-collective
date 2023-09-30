from rest_framework import generics
from collective.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS

class UserWritePermission(BasePermission):
    message = 'Sorry, editing is only available to the author.'

    def has_object_permission(self, request, view, obj):
        
        if request.method in SAFE_METHODS:
            return True
        
        return obj.author == request.user


class PostList(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class PostDetail(generics.RetrieveDestroyAPIView, UserWritePermission):
    permission_classes = [UserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

