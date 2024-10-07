from rest_framework import serializers
from .models import Inventory
from users.models import CustomUser


class InventorySerializer(serializers.ModelSerializer):


    class Meta:
        model = Inventory
        fields = ['id', 'item_name', 'quantity', 'inventory_type', 'amount', 'date_added', 'last_updated']
        read_only_fields = ['date_added', 'last_updated']

    def validate_quantity(self, value):
        if value < 0:
            raise serializers.ValidationError("Quantity must be a non-negative integer.")
        return value
