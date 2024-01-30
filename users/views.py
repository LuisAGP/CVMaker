from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import authenticate, login, logout
from django.contrib import messages
from django.views import View
from .forms import ProfileForm, UserForm

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')

    if request.method == 'POST':
        if 'username' in request.POST:
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                messages.success(request, f"You are now log in as {username}")
                return redirect('home')
            else:
                messages.error(request, "Wrong username or password. Try again!")

    return render(request, 'views/login.html', {})



def logout_view(request):
    logout(request)
    return redirect('login')



def register_view(request):
    
    if request.method == "GET":
        register_form = UserCreationForm()
    if request.method == "POST":
        register_form = UserCreationForm(data=request.POST)
        if register_form.is_valid():
            register_form.save()
        else:
            messages.error(request, f'Error trying to register new user, try again!')
    return render(request, 'views/register.html', {'register_form': register_form})



class ProfileView(View):

    def get(self, request):
        context = {
            'user_form': UserForm(instance=request.user),
            'profile_form': ProfileForm(instance=request.user.profile),
        }
        return render(request, 'views/profile.html', context)

    def post(self, request):
        user_form = UserForm(instance=request.user)
        profile_form = ProfileForm(request.POST, request.FILES, instance=request.user.profile)

        if profile_form.is_valid():
            profile_form.save()
            messages.success(request, "Profile Updated Successfully!")
        else:
            messages.error(request, "Error Updating Profile!")

        context = {
            'user_form': user_form,
            'profile_form': ProfileForm(instance=request.user.profile)
        }

        return render(request, 'views/profile.html', context)
