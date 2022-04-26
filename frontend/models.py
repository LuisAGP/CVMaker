from django.db import models


# Create your models here.
class Template(models.Model):
    id_template      = models.AutoField(primary_key=True)
    image_name       = models.TextField(max_length=255, null=True)
    image_url        = models.TextField(max_length=255, null=True)
    filename         = models.TextField(max_length=255)
    file_extention   = models.TextField(max_length=10)
    url              = models.TextField(max_length=255)
    file             = models.FileField(upload_to="templates")
    created_at       = models.DateTimeField(auto_now_add=True)
    update_at        = models.DateTimeField(auto_now_add=True)
    deleted_at       = models.DateTimeField(null=True, blank=True)