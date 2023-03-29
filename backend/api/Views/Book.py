from api.models import booking
from api.serializers import booking_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from django.db.models import Q

import sys


sys.path.append('../..')


class BookActions(APIView):
    
    def put(self, request, uuid, *args, **kwargs):
        
        data = request.data
        action = self.request.query_params.get("action")
        
        if action == "checkin":
            if booking.objects.filter(Q(code=data.get('code', None)) | Q(driver=data.get('driver', None))).exists():
                return Response('Booking with details already exists', status=status.HTTP_409_CONFLICT)
                
            serializer = booking_serializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        elif action == "checkout":
            if booking.objects.filter(code=data.get('code', None), driver=data.get('driver', None)).exists():
                data = booking.objects.get(code=data.get('code', None), driver=data.get('driver', None)).delete()
                return Response("", status=status.HTTP_200_OK)
            
            return Response("Booking does not exist", status=status.HTTP_404_NOT_FOUND)
        elif action == "confirm":    
            if booking.objects.filter(code=data.get('code', None), driver=data.get('driver', None)).exists():
                record = booking.objects.get(code=data.get('code', None), driver=data.get('driver', None))
                serializer = booking_serializer(record, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data, status=status.HTTP_200_OK)
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:    
                return Response("Booking to confirm does not exist", status=status.HTTP_404_NOT_FOUND)

        return Response("Bad action", status=status.HTTP_400_BAD_REQUEST)
