from django.contrib.auth import authenticate
from django.contrib.auth.models import update_last_login
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CustomUser
from django.contrib.auth.hashers import make_password

# Signup API
@api_view(["POST"])
def signup(request):
    data = request.data
    if CustomUser.objects.filter(username=data["username"]).exists():
        return Response({"error": "Username already exists"}, status=400)

    user = CustomUser.objects.create(
        username=data["username"],
        name=data["name"],
        email=data["email"],
        password=make_password(data["password"]),
    )
    return Response({"message": "User registered successfully"})

# Login API
@api_view(["POST"])
def login(request):
    data = request.data
    user = authenticate(username=data["username"], password=data["password"])

    if user:
        refresh = RefreshToken.for_user(user)
        update_last_login(None, user)
        return Response({
            "message": "Login successful",
            "token": str(refresh.access_token),
            "username": user.username,
            "name": user.name,
            "email": user.email,
        })
    return Response({"error": "Invalid credentials"}, status=401)
