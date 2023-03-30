from api.models import slot, booking
from api.serializers import slot_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from django.http import JsonResponse
from django.core import serializers
from django.db.models import Max, F

import json
import sys


sys.path.append('../..')


class SlotPreBook(APIView):
    
    def get(self, request, *args, **kwargs):
    
        booked_slots = booking.objects.filter().values_list('code', flat=True)
        available_slots = slot.objects.filter().exclude(code__in=booked_slots)
        
        first_available_slot = available_slots.first()
        if first_available_slot:
            record = slot_serializer(first_available_slot)
            return Response(record.data, status=status.HTTP_200_OK)
        else:
            return Response("No slots free", status=status.HTTP_404_NOT_FOUND)
        

class SlotActions(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request, num, *args, **kwargs):
        
        max_code = slot.objects.aggregate(Max('code'))['code__max'] or 0
        start_code = max_code + 1 if max_code else 100
        slots = [slot(code=start_code+i) for i in range(num)]
        slot.objects.bulk_create(slots)
        
        return Response("", status=status.HTTP_201_CREATED)
    
    
    def delete(self, request, num, *args, **kwargs):

        if slot.objects.filter(code=num).exists():
            data = slot.objects.get(code=num).delete()
            return Response("", status=status.HTTP_200_OK)
            
        return Response("", status=status.HTTP_404_NOT_FOUND)
    

class SlotGet(APIView):
    
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request, *args, **kwargs):
        
        queryset = slot.objects.select_related('booking').annotate(
                type=F('booking__type'),
                plate=F('booking__driver__plate'),
                name=F('booking__driver__name'),
            ).values('code', 'type', 'plate', 'name',)
        
        data = list(queryset)
        return JsonResponse({'slots' : data} , safe=False)