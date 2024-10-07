from rest_framework import serializers
from .models import Crisis

class CrisisSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crisis
        fields = ['id', 'title', 'description', 'location', 'image', 'severity', 'required_help', 'status', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
