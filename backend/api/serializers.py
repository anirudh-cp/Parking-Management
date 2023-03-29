from rest_framework import serializers
from .models import *
from django.contrib.auth.models import Group


class userSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=('email', 'uuid', 'date_joined', 'is_superuser')


class userSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model=user
        fields=('email', 'uuid')


class RegistrationUserSerializer(serializers.ModelSerializer):
    
    password2 = serializers.CharField(style={'input_type': 'password'},
                                      write_only=True)
    
    class Meta:
        model = user
        fields = ('email', 'password', 'password2')
        extra_kwargs = {
			'password': {'write_only': True}
		}
        
    def save(self, **kwargs):
        print()
        userObj = user(email=self.validated_data['email'])
        password = self.validated_data['password']
        password2 = self.validated_data['password2']
        
        if password != password2:
            raise serializers.ValidationError({'Password': 'Passwords do not match.'})

        userObj.set_password(password)
        userObj.save()
        
        return userObj


class driver_serializer(serializers.ModelSerializer):
    class Meta:
        model=driver
        fields='__all__'
        

class slot_serializer(serializers.ModelSerializer):
    class Meta:
        model=slot
        fields='__all__'


class booking_serializer(serializers.ModelSerializer):
    class Meta:
        model=booking
        fields='__all__'