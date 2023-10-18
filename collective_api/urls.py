from django.urls import path
from .views import PostList, PostDetail, CreatePost, EditPost, CurrentUserView, DeletePost, LikePost, CommentPost

app_name = 'collective_api'

urlpatterns = [
    path('posts/<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('posts/', PostList.as_view(), name='listcreate'),
    path('create/', CreatePost.as_view(), name='createpost'),
    path('edit/<int:pk>/', EditPost.as_view(), name='editpost'),
    path('delete/<int:pk>/', DeletePost.as_view(), name='deletepost'),
    path('current-user/', CurrentUserView.as_view(), name='current-user'),
    path('like/<post_id>/', LikePost.as_view(), name='likepost'),
    path('posts/<post_id>/comments/', CommentPost.as_view(), name='post-comments'),
]
