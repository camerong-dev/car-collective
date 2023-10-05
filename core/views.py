from django.views.generic import TemplateView
from django.views.decorators.cache import never_cache

# Serve React's index.html for all other routes
index_view = never_cache(TemplateView.as_view(template_name='frontend/build/index.html'))
