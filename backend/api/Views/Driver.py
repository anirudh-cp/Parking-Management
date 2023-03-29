from api.models import driver
from api.serializers import driver_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

import sys


sys.path.append('../..')


class DriverAdd(APIView):
    
    def post(self, request, *args, **kwargs):
        
        data = request.data
        if driver.objects.filter(plate=data.get('plate', None)).exists():
            return Response("Driver data exists", status=status.HTTP_200_OK)
        
        serializer = driver_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
