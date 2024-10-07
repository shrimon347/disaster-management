from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from django.db.models import Sum
from .models import Donation
from .serializers import DonationSerializer

class DonationCreateView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TotalFundsView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        total_funds = Donation.objects.aggregate(total_amount=Sum('amount'))['total_amount'] or 0
        return Response({'total_funds': total_funds})

class DonationListView(generics.ListAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [AllowAny]

class DonationDetailView(generics.RetrieveAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [AllowAny]


