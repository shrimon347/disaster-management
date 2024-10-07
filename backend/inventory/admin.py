from django.contrib import admin
from .models import Inventory

class InventoryAdmin(admin.ModelAdmin):
    list_display = ['item_name', 'quantity', 'inventory_type', 'date_added', 'last_updated']
    readonly_fields = ['date_added', 'last_updated']
admin.site.register(Inventory, InventoryAdmin)
