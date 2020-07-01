from rest_framework import permissions

class IsPostOrDeny(permissions.BasePermission):

    def has_permission(self, request, view):
        if (request.method == 'POST'):
            return True
        
        return (request.method in permissions.SAFE_METHODS or
                request.user and
                request.user.is_authenticated())
            