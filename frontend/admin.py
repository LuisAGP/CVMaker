from django.contrib import admin
from frontend.models import Template

# Register your models here.

class AdminTemplate(admin.ModelAdmin):
    pass


admin.site.register(Template)