from django.urls import path
from .views import InventoryListCreateView, InventoryRetrieveUpdateDestroyView

urlpatterns = [
    path('inventory/', InventoryListCreateView.as_view(), name='inventory-list-create'),
    path('inventory/<int:pk>/', InventoryRetrieveUpdateDestroyView.as_view(), name='inventory-detail'),
]
