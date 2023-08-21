from django.contrib.auth import authenticate, login, logout
from django.forms.models import model_to_dict
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import status, serializers
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import IntervalGameStat, ChordGameStat

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


@api_view(['GET'])
@permission_classes([IsAuthenticated])
# @csrf_exempt
def get_user(request):
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
        return Response({
            "message": "All fields are required."
            }, status=status.HTTP_400_BAD_REQUEST)

    if password != confirmation:
        return Response({
            "message": "Passwords must match."
            }, status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.create_user(username, email, password)
        user.save()
        return Response({
            "message": "User registered successfully."
            }, status=status.HTTP_201_CREATED)
    except IntegrityError:
        return Response({
            "message": "Username already taken."
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
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
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):

    logout(request)
    return Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)

@api_view(['POST'])
@csrf_exempt
def create_interval_session(request):

    user = request.user if request.user.is_authenticated else None
    
    session = IntervalGameStat(user=user)
    session.save()
    id = session.id
    
    return Response({"id": id}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@csrf_exempt
def create_chord_session(request):

    user = request.user if request.user.is_authenticated else None
    
    session = ChordGameStat(user=user)
    session.save()
    id = session.id
    
    return Response({"id": id}, status=status.HTTP_201_CREATED)

@api_view(['PUT'])
def update_interval_session(request):
    
    id = request.data.get('id')

    try:
        session = IntervalGameStat.objects.get(id=id)
    except IntervalGameStat.DoesNotExist:
        return Response({
            'message': 'ID does not exist',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    session.total_correct = request.data.get('total_correct')
    session.total_incorrect = request.data.get('total_incorrect')
    session.stats = request.data.get('stats')

    session.save()

    return Response({
        "message": "Session updated successfully",
    }, status=status.HTTP_200_OK)

@api_view(['PUT'])
def update_chord_session(request):
    
    id = request.data.get('id')

    try:
        session = ChordGameStat.objects.get(id=id)
    except ChordGameStat.DoesNotExist:
        return Response({
            'message': 'ID does not exist',
        }, status=status.HTTP_400_BAD_REQUEST)
    
    session.total_correct = request.data.get('total_correct')
    session.total_incorrect = request.data.get('total_incorrect')
    session.stats = request.data.get('stats')

    session.save()

    return Response({
        "message": "Session updated successfully",
    }, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def stats(request):
    
    user = request.user
    interval_stats = IntervalGameStat.objects.filter(user=user)
    chord_stats = ChordGameStat.objects.filter(user=user)
    if interval_stats.count() == 0 and chord_stats.count() == 0:
        return Response({
            'message': 'No stats found'
        }, status=status.HTTP_400_BAD_REQUEST)
    
    interval_stats_dicts = [model_to_dict(stat) for stat in interval_stats]
    chord_stats_dicts = [model_to_dict(stat) for stat in chord_stats]

    return Response({
        'interval_stats': interval_stats_dicts,
        'chord_stats': chord_stats_dicts,
        }, status=status.HTTP_200_OK)
     
