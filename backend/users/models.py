from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.db import models

# Custom user manager
class CustomUserManager(UserManager):
    def _create_user(self, username, email, password,password2=None, **extra_fields):
        """Create and return a user with an email, username, and password."""
        if not email:
            raise ValueError("You must provide a valid email address")
        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)  
        user.save(using=self._db) 

        return user
    
    def create_user(self, username, email, password=None, **extra_fields):
        """Create and return a regular user."""
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(username, email, password, **extra_fields)
    
    def create_superuser(self, username, email, password=None, **extra_fields):
        """Create and return a superuser."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self._create_user(username, email, password, **extra_fields)

# Custom user model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    ROLES = [
        ('admin', 'Admin'),
        ('volunteer', 'Volunteer'),
    ]

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=50, unique=True, blank=True, null=True)  
    avatar = models.ImageField(upload_to='uploads/avatars', null=True, blank=True)
    role = models.CharField(max_length=10, choices=ROLES, blank=True)
    age = models.PositiveIntegerField(blank=True, default=0)
    mobile_number = models.CharField(max_length=15, unique=True)
    assigned_task = models.CharField(max_length=255, blank=True, default="")
    location = models.CharField(max_length=255, blank=True)

    is_active = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']  

    def __str__(self):
        return self.email  