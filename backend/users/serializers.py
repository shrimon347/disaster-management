from rest_framework import serializers

from .models import CustomUser


class UserRegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'password', 'password2', 'role', 'age', 'mobile_number', 'assigned_task', 'location']
        extra_kwargs={
                'password':{'write_only':True}
            }

         # Validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs

    def create(self, validate_data):
        return CustomUser.objects._create_user(**validate_data)


    
class UserLoginSerializer(serializers.ModelSerializer):
  email = serializers.EmailField(max_length=255)
  class Meta:
    model = CustomUser
    fields = ['email', 'password','username','avatar']

class UserProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = CustomUser
    fields = ['id', 'username', 'email', 'age', 'mobile_number', 'assigned_task', 'location','avatar']


class UserChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type': 'password'}, write_only=True)

    class Meta:
        fields = ['old_password', 'password', 'password2']

    def validate(self, attrs):
        old_password = attrs.get('old_password')
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')

        # Check if the old password matches the user's current password
        if not user.check_password(old_password):
            raise serializers.ValidationError("Old password is incorrect")

        # Validate that the new password and confirm password match
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")

        return attrs

    def save(self, **kwargs):
        password = self.validated_data.get('password')
        user = self.context.get('user')
        user.set_password(password)
        user.save()
        return user
