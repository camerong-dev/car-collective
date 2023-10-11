from django.urls import path
from .views import UserCreate, BlacklistTokenUpdateView, GetUserNameFromId

app_name = 'accounts'

urlpatterns = [
    path('signup/', UserCreate.as_view(), name="create_user"),
    path('logout/blacklist/', BlacklistTokenUpdateView.as_view(), name='blacklist'),
    path('get_username/<int:user_id>/', GetUserNameFromId.as_view(),
name="get-username"),
]