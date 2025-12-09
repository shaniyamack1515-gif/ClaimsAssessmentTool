from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login
from django import forms
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required


class RegistrationForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model=User
        fields = ["username", "email", "password1", "password2"]

def registration_view(request):
    if request.method == "POST":
        form = RegistrationForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect("index")
    else:
        form = RegistrationForm()  

    return render(request, "registration/register.html", {"form": form})


def index(request):
    return render(request, "index.html")

def assessment(request):
    return render(request, "assessment.html")

def user_guide(request):
    return render(request, "user_guide.html")

