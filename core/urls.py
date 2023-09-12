from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('collective.urls', namespace='collective')),
    path('api/', include('collective_api.urls', namespace='collective_api')),
]
