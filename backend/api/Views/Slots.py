from api.models import slot, booking
from api.serializers import slot_serializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions

from django.http import JsonResponse
from django.core import serializers
from django.db.models import Max


import sys


sys.path.append('../..')


class SlotPreBook(APIView):
    
    def get(self, request, *args, **kwargs):
    
        booked_slots = booking.objects.filter().values_list('code', flat=True)
        available_slots = slot.exclude(code__in=booked_slots)

        first_available_slot = available_slots.first()
        if first_available_slot:
            return Response(first_available_slot, status=status.HTTP_200_OK)
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

        slots = slot.objects.all().select_related('booking', 'booking__driver')
        slots_data = serializers.serialize('json', slots)

        return JsonResponse({'slots': slots_data})
