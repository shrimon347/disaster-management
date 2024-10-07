from django.urls import path
from .views import CrisisListCreateView, CrisisRetrieveUpdateDestroyView

urlpatterns = [
    path('crises/', CrisisListCreateView.as_view(), name='crisis-list-create'),  # List and create
    path('crises/<int:pk>/', CrisisRetrieveUpdateDestroyView.as_view(), name='crisis-detail'),  # Retrieve, update, delete
]
