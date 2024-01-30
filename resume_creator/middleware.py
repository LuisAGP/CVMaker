from django.shortcuts import redirect
from django.urls import resolve
from django.utils.deprecation import MiddlewareMixin
from .settings import ALLOWED_URLS_NOT_AUTHENTICATED_USER

class AuthRequiredMiddleware(MiddlewareMixin):
    def process_request(self, request):
        current_url = resolve(request.path_info).url_name
        full_url = request.build_absolute_uri()
        if not request.user.is_authenticated and current_url not in ALLOWED_URLS_NOT_AUTHENTICATED_USER and '/media/' not in full_url:
            return redirect('login')

        return None