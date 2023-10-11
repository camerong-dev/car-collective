from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, UsernameSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model


class UserCreate(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class BlacklistTokenUpdateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = ()

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        

class GetUserNameFromId(APIView):
    def get(self, request, user_id):
        User = get_user_model()
        try:
            user = User.objects.get(id=user_id)
            username = user.user_name
            serializer = UsernameSerializer({'user_name': username})
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            print("User not found")
            return Response({'error': 'User not found'},
status=status.HTTP_404_NOT_FOUND)
