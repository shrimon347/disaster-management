from django.urls import path
from .views import DonationCreateView, TotalFundsView, DonationListView, DonationDetailView

urlpatterns = [
    path('donations/', DonationListView.as_view(), name='donation-list'),
    path('donations/<int:pk>/', DonationDetailView.as_view(), name='donation-detail'),
    path('donations/create/', DonationCreateView.as_view(), name='donation-create'),
    path('total-funds/', TotalFundsView.as_view(), name='total-funds'),
]
