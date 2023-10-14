from django.urls import path
from .views import PostList, PostDetail, CreatePost

app_name = 'collective_api'

urlpatterns = [
    path('posts/<int:pk>/', PostDetail.as_view(), name='detailcreate'),
    path('posts/', PostList.as_view(), name='listcreate'),
    path('create/', CreatePost.as_view(), name='createpost'),
]
