from django.contrib import admin
from django.urls import path, include
from django.contrib.auth import views as auth_views
from mainapp.views import index, registration_view, assessment, user_guide

urlpatterns = [
    path('admin/', admin.site.urls),

    path("accounts/", include("django.contrib.auth.urls")),
    
    path("", index, name="index"),

    path("accounts/register/", registration_view, name="register"), 

    path("assessment/", assessment, name="assessment"),

    path("user_guide/", user_guide, name="user_guide"),

    path("accounts/password/reset/",auth_views.PasswordResetView.as_view(),name="password_reset",),

    path("accounts/password/reset/done/",auth_views.PasswordResetDoneView.as_view(),name="password_reset_done",),

    path("accounts/reset/<uidb64>/<token>/",auth_views.PasswordResetConfirmView.as_view(),name="password_reset_confirm",),
    
    path("accounts/reset/done/",auth_views.PasswordResetCompleteView.as_view(),name="password_reset_complete",),
]
