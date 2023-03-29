from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.postgres.fields import ArrayField

import uuid

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


class user_manager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email=self.normalize_email(email),
        )
        
        user.set_password(password)
        user.save(using=self._db)
        return user


    def create_superuser(self, email, password):
        user = self.create_user(
            email=self.normalize_email(email),
            password=password,
        )
        
        user.is_staff = True
        user.is_superuser = True
        
        user.save(using=self._db)
        return user


class user(AbstractBaseUser):
    # 320 Characters is the max len of a email.
    
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    email = models.EmailField(max_length=320,  unique=True)
    
    date_joined = models.DateTimeField(auto_now_add=True)
    last_login = models.DateTimeField(auto_now=True)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    
    USERNAME_FIELD = 'email'

    objects = user_manager()

    def __str__(self):
        return self.uuid
    
    # For checking permissions. to keep it simple all STAFF have ALL permissons
    def has_perm(self, perm, obj=None):
        return self.is_staff

    # Does this user have permission to view this app? (ALWAYS YES FOR SIMPLICITY)
    def has_module_perms(self, app_label):
        return True


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)



class driver(models.Model):
    
    plate = models.CharField(max_length=150, primary_key=True)   
    name = models.CharField(max_length=256)
    
    def __str__(self):
        return self.plate
    

class slot(models.Model):
    
    code = models.IntegerChoices(primary_key=True)   
    
    def __str__(self):
        return self.code
    

class booking(models.Model):
    
    driver = models.OneToOneField(driver, on_delete=models.CASCADE)
    code = models.OneToOneField(slot, on_delete=models.CASCADE)
    type = models.CharField(max_length=10, choices=[('prebook', 'prebook'), ('onsite', 'onsite')])
    time = models.DateTimeField()
    
    def __str__(self):
        return f'{self.driver}-{self.code}-{self.type}'