from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError
# from django.shortcuts import render
from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import IntervalGameStats


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


@api_view(['GET'])
@permission_classes([IsAuthenticated])
@csrf_exempt
def get_user(request):
    print("get user ran")
    user = request.user
    return Response({
        'id': user.id,
        'username': user.username,
        'email': user.email,
        'is_authenticated': True
    }, status=status.HTTP_200_OK)

@api_view(['POST'])
def register(request):
    username = request.data.get("username")
    email = request.data.get("email")
    password = request.data.get("password")
    confirmation = request.data.get("confirmation")

    if not username or not email or not password or not confirmation:
        return Response(
            {"message": "All fields are required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if password != confirmation:
        return Response(
            {"message": "Passwords must match."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        user = User.objects.create_user(username, email, password)
        user.save()
    except IntegrityError:
        return Response(
            {"message": "Username already taken."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    return Response(
        {"message": "User registered successfully."}, 
        status=status.HTTP_201_CREATED
    )

@api_view(['POST'])
@csrf_exempt
def login_user(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"message": "Both email and password are required."}, 
            status=status.HTTP_400_BAD_REQUEST
        )

    user = authenticate(request, email=email, password=password)

    if user is None:
        return Response(
            {"message": "Invalid username or password."}, 
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    login(request, user)
    user_data = UserSerializer(user).data
    response = Response({"user": user_data}, status=status.HTTP_200_OK)
    response["Access-Control-Allow-Credentials"] = "true"
    print(response)
    return response

@api_view(['POST'])
def create_interval_session(request):
    id = 10
    return Response({
        "id": id
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def update_interval_session(request):
    for interval in request.data:
        print(interval)
        for key in request.data[interval]:
            print(f'{key}: {request.data[interval][key]}')
    return Response({
        "message": "success",
    }, status=status.HTTP_200_OK)

