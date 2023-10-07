from django.contrib import admin
from . import views
from django.conf.urls import static
from django.conf import settings
from rest_framework import routers
from django.shortcuts import render
from django.urls import path, include, re_path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.views.generic import TemplateView

def render_react(request):
    return render(request, "index.html")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/', include('collective_api.urls', namespace='collective_api')),
    path('api/user/', include('accounts.urls', namespace='accounts')),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path(r"^$", render_react),
    re_path(r"^(?:.*)/?$", render_react),
]
