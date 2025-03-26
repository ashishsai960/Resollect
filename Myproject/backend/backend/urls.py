from django.urls import path, include

urlpatterns = [
    path('api/student/', include('student.urls')),
    path("api/accounts/", include("accounts.urls")),
]
