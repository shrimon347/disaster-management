from django.db import models
from users.models import CustomUser  
from django.db.models import Q

class Inventory(models.Model):
    INVENTORY_TYPES = [
        ('relief', 'Relief'),  
        ('expense', 'Expense'), 
    ]
    
    item_name = models.CharField(max_length=100)
    quantity = models.PositiveIntegerField()
    inventory_type = models.CharField(max_length=10, choices=INVENTORY_TYPES)
    amount = models.DecimalField(max_digits=10, decimal_places=2,default=0)  
    
    
    date_added = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.item_name} - {self.quantity}"
