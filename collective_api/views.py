from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from collective.models import Post, Like, Comment
from django.shortcuts import get_object_or_404
from .serializers import PostSerializer, LikeSerializer, CommentSerializer
from rest_framework.permissions import BasePermission, IsAuthenticatedOrReadOnly, SAFE_METHODS, IsAuthenticated, AllowAny

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

    def get_serializer_context(self):
        return {"request": self.request}


class PostDetail(generics.RetrieveDestroyAPIView):
    permission_classes = [UserWritePermission]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_serializer_context(self):
        return {"request": self.request}


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


def perform_create(self, serializer):
    serializer.save(author=self.request.user)


class EditPost(generics.UpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()

    def update(self, request, *args, **kwargs):
        post = self.get_object()
        if request.user == post.author or request.user.is_staff:
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'You do not have permission to edit this post'}, status=status.HTTP_403_FORBIDDEN)
        

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_authenticated:
            return Response({
                'username': request.user.user_name,
                'is_staff': request.user.is_staff,
            })
        else:
            return Response({"detail": "User not authenticated"}, status=status.HTTP_401_UNAUTHORIZED)
        

class DeletePost(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = PostSerializer
    queryset = Post.objects.all()


class LikePost(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, post_id, format=None):
        post = get_object_or_404(Post, id=post_id)
        liked = Like.objects.filter(user=request.user, post=post).exists()

        if not liked:
            like = Like(user=request.user, post=post)
            like.save()
            return Response({'status': 'liked'}, status=status.HTTP_201_CREATED)
        else:
            Like.objects.filter(user=request.user, post=post).delete()
            return Response({'status': 'unliked'}, status=status.HTTP_200_OK)
        


class CommentPost(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['post_id']
        return Comment.objects.filter(post__id=post_id)

    def perform_create(self, serializer):
        post = get_object_or_404(Post, id=self.kwargs['post_id'])
        serializer.save(author=self.request.user, post=post)