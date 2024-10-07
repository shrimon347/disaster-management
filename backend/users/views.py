from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import CustomUser
from users.serializers import  UserChangePasswordSerializer, UserLoginSerializer, UserProfileSerializer, UserRegisterSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics


# Generate Token Manually
def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)
  return {
      'refresh': str(refresh),
      'access': str(refresh.access_token),
  }

class UserRegistrationView(APIView):

  def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()  
            token = get_tokens_for_user(user)  
            return Response({'token': token, 'msg': 'Registration Successful'}, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

class UserLoginView(APIView):

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.data.get('email')
        password = serializer.data.get('password')
        user = authenticate(email=email, password=password)

        if user is not None:
            # Generate token for the user
            token = get_tokens_for_user(user)

            # Serialize user information (adjust the fields based on your User model)
            user_data = {
                'id': user.id,
                'email': user.email,
                'username': user.username,
                'role': user.role,
                'avatar': user.avatar.url if user.avatar else None,  # Handle avatar if available
            }

            return Response({'token': token, 'msg': 'Login Success', 'user': user_data}, status=status.HTTP_200_OK)
        else:
            return Response({'errors': {'non_field_errors': ['Email or Password is not valid']}}, status=status.HTTP_404_NOT_FOUND)


class UserProfileView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user  # Get the currently authenticated user
        serializer = UserProfileSerializer(user, data=request.data, partial=True)  # partial=True for partial updates
        if serializer.is_valid():
            serializer.save()  # This will call the built-in update() method
            return Response({'msg': 'Profile updated successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': user})
        if serializer.is_valid():
            serializer.save()
            return Response({'msg': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class VolunteerListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    queryset = CustomUser.objects.all()  
    serializer_class = UserRegisterSerializer
