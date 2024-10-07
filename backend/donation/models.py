from django.db import models
from django.utils import timezone

class Donation(models.Model):
    donor_name = models.CharField(max_length=255) 
    amount = models.DecimalField(max_digits=10, decimal_places=2)  
    date = models.DateTimeField(default=timezone.now)  
    message = models.TextField(blank=True, null=True) 

    def __str__(self):
        return f"Donation of {self.amount} by {self.donor_name} on {self.date}"

    class Meta:
        ordering = ['-date']  