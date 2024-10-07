from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,AllowAny
from users.permissions import IsVolunteer, IsAdmin
from .models import Inventory
from .serializers import InventorySerializer

class InventoryListCreateView(generics.ListCreateAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    # permission_classes = [IsAuthenticated, IsAdmin | IsVolunteer]
    authentication_classes = [TokenAuthentication]

class InventoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Inventory.objects.all()
    serializer_class = InventorySerializer
    permission_classes = [IsAuthenticated, IsAdmin | IsVolunteer]
    authentication_classes = [TokenAuthentication]
