from rest_framework import generics
from .models import Crisis
from .serializers import CrisisSerializer
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter

class CrisisListCreateView(generics.ListCreateAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        status_query = self.request.query_params.get('status', None)
        severity_query = self.request.query_params.get('severity', None)

        if status_query:
            queryset = queryset.filter(status__icontains=status_query)
        if severity_query:
            queryset = queryset.filter(severity__icontains=severity_query)

        return queryset

    def perform_create(self, serializer):
        # Automatically set the status to 'pending' for new crises
        serializer.save(status='pending')

class CrisisRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Crisis.objects.all()
    serializer_class = CrisisSerializer
    permission_classes = [AllowAny]
