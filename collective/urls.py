from django.urls import path
from django.views.generic import TemplateView

app_name = 'collective'

urlpatterns = [
    path('', TemplateView.as_view(template_name="collective/index.html")),
]
