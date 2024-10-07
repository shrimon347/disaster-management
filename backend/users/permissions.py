from rest_framework.permissions import BasePermission

class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        if not request.user or request.user.is_anonymous:
            return False
        return request.user.role == 'admin'


class IsVolunteer(BasePermission):
 
    def has_permission(self, request, view):
        if not request.user or request.user.is_anonymous:
            return False
        return request.user.role == 'volunteer'
