from django.urls import path
from frontend.views import *

urlpatterns = [
    path('', index),
    path('resume/', index),
    path('templates/', index),
    path('uploadTemplate/', upload_template),
    path('getTemplates/', get_templates),
]