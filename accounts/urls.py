from django.urls import path
from .views import UserCreate

app_name = 'accounts'

urlpatterns = [
    path('signup/', UserCreate.as_view(), name="create_user"),
]