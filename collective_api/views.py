from rest_framework import generics, status
from rest_framework.response import Response
from collective.models import Post
from .serializers import PostSerializer
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS, IsAuthenticated

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


class PostDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [UserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class CreatePost(generics.CreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['author'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
