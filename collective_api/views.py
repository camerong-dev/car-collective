from rest_framework import generics, status
from rest_framework.response import Response
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

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            post = serializer.save(author=request.user)

            serializer.save()
            return Response(serializer.data, status-status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PostDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [UserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

